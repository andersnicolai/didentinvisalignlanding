import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendDiscordNotification, formatContactForDiscord } from "@/utils/discord";
// Import client only if we need it for Sanity
let client: any = null;
if (process.env.SAVE_TO_SANITY === "true") {
  try {
    // Import dynamically to prevent build errors if Sanity is not configured
    client = require("@/lib/sanity/client").client;
  } catch (error) {
    console.warn("Sanity client not initialized, skipping Sanity integration");
  }
}

// Konfigurer Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Helper function to build email content
function buildEmailContent(
  data: any, 
  customerTypeMap: Record<string, string>,
  businessTypeMap: Record<string, string>,
  projectTypeMap: Record<string, string>,
  budgetMap: Record<string, string>
): string {
  return `
    <h1>Ny henvendelse fra nettsiden</h1>
    <h2>Kontaktinformasjon:</h2>
    <p><strong>Navn:</strong> ${data.name}</p>
    <p><strong>E-post:</strong> ${data.email}</p>
    <p><strong>Telefon:</strong> ${data.phone}</p>
    ${data.address ? `<p><strong>Adresse:</strong> ${data.address}</p>` : ""}
    ${data.company ? `<p><strong>Firma:</strong> ${data.company}</p>` : ""}
    ${data.customerType ? `<p><strong>Kundetype:</strong> ${customerTypeMap[data.customerType] || data.customerType}</p>` : ""}
    ${data.businessType ? `<p><strong>Type bedrift:</strong> ${businessTypeMap[data.businessType] || data.businessType}</p>` : ""}
    
    ${data.projectType ? `<h2>Prosjektdetaljer:</h2>
    <p><strong>Tjeneste:</strong> ${projectTypeMap[data.projectType] || data.projectType}</p>` : ""}
    ${data.budget ? `<p><strong>Budsjett:</strong> ${budgetMap[data.budget] || data.budget}</p>` : ""}
    
    ${data.message ? `<h2>Tilleggsmelding:</h2><p>${data.message}</p>` : ""}
    
    <p><em>Denne henvendelsen ble sendt fra kontaktskjemaet på dident.no</em></p>
  `;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validere data
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Manglende påkrevde felt" },
        { status: 400 }
      );
    }

    // Formatere prosjekttype
    const projectTypeMap: Record<string, string> = {
      maling: "Maling",
      gulvlegging: "Gulvlegging",
      flislegging: "Flislegging",
      totalrenovering: "Totalleverandør"
    };

    // Formatere budget
    const budgetMap: Record<string, string> = {
      "10000": "Under 10.000 kr",
      "50000": "10.000 - 50.000 kr",
      "100000": "50.000 - 100.000 kr",
      "more": "Over 100.000 kr",
    };

    // Formatere kundetype
    const customerTypeMap: Record<string, string> = {
      private: "Privat",
      business: "Bedrift",
    };

    // Formatere business type
    const businessTypeMap: Record<string, string> = {
      "eiendomsforvaltere": "Eiendomsforvalter",
      "hoteller-restauranter": "Hotell/Restaurant",
      "B2B General": "B2B Generell Henvendelse"
    };

    // Prepare source information
    data.source = 'kontaktskjema';
    data.landingPage = request.headers.get('referer') || '/kontakt';

    // Send notification to Discord (primary notification method)
    let discordSuccess = false;
    try {
      const { title, fields } = formatContactForDiscord(data);
      discordSuccess = await sendDiscordNotification('contact', title, fields);
      if (discordSuccess) {
        console.log('Discord notification sent successfully for contact form');
      } else {
        console.warn('Discord notification failed to send for contact form');
      }
    } catch (discordError) {
      console.error('Error in Discord notification process:', discordError);
    }

    // If Discord fails, always send email as backup
    if (!discordSuccess) {
      try {
        // Build email content for backup
        let emailContent = buildEmailContent(data, customerTypeMap, businessTypeMap, projectTypeMap, budgetMap);
        emailContent += `\n<p><em>Discord-varsling feilet, dette er en backup-epost.</em></p>`;

        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          await transporter.sendMail({
            from: `"Dident Nettside" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: "nicolai@vekstboost.no, nicolai@onedevconsultancy.no",
            subject: `[BACKUP] Ny kontaktskjema-henvendelse fra ${data.name}`,
            html: emailContent,
            replyTo: data.email,
          });
          console.log('Backup email sent to developer');
        } else {
          console.warn('Email configuration missing, could not send backup email');
        }
      } catch (emailError) {
        console.error('Backup email also failed:', emailError);
      }
    }

    // Optional: Still send email if configured and desired
    const ENABLE_EMAIL_TO_CLINIC = false; // Set to true when client wants email notifications
    if (ENABLE_EMAIL_TO_CLINIC && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        // Build email content
        const emailContent = buildEmailContent(data, customerTypeMap, businessTypeMap, projectTypeMap, budgetMap);

        await transporter.sendMail({
          from: `"Dident Nettside" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || "post@dident.no",
          cc: "nicolai@vekstboost.no, nicolai@onedevconsultancy.no",
          subject: `Ny kontaktskjema-henvendelse fra ${data.name}`,
          html: emailContent,
          replyTo: data.email,
        });
        console.log('Email sent to clinic');
      } catch (emailError) {
        console.error('Error sending email to clinic:', emailError);
        // Continue even if email fails
      }
    }

    // Lagre i Sanity CMS (valgfritt)
    if (process.env.SAVE_TO_SANITY === "true" && client) {
      try {
        await client.create({
          _type: "contact",
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          company: data.company,
          projectType: data.projectType,
          budget: data.budget,
          customerType: data.customerType,
          businessType: data.businessType,
          message: data.message,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.warn("Failed to save to Sanity, but continuing:", error);
        // Don't fail the request if Sanity fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feil ved behandling av kontaktskjema:", error);
    
    // Try to send error notification to Discord
    try {
      await sendDiscordNotification('error', 'Contact Form Error', [
        {
          name: 'Error Details',
          value: `${error}`,
          inline: false
        }
      ], 'An error occurred while processing a contact form submission.');
    } catch (notifyError) {
      console.error('Failed to send error notification:', notifyError);
    }
    
    return NextResponse.json(
      { error: "Det oppstod en feil ved behandling av forespørselen" },
      { status: 500 }
    );
  }
}