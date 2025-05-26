import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createHash } from "crypto";
import { sendDiscordNotification, formatLeadForDiscord } from "@/utils/discord";

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Simple in-memory storage for leads (would be replaced with a database in production)
const leadsStorage: Record<string, any> = {};

// Helper function to hash data for privacy
const hashData = (data: string): string => {
  return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

// Send event to Facebook CAPI if API key is available
const sendToFacebookAPI = async (event: any) => {
  if (!process.env.FB_ACCESS_TOKEN) {
    console.log('Facebook API token not found, skipping Facebook event tracking');
    return;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v16.0/${process.env.FB_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
          access_token: process.env.FB_ACCESS_TOKEN,
          test_event_code: process.env.NODE_ENV === 'development' ? process.env.FB_TEST_EVENT_CODE : undefined,
        }),
      }
    );

    const result = await response.json();
    console.log('Facebook API response:', result);
    return result;
  } catch (error) {
    console.error('Error sending to Facebook API:', error);
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate data
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate lead ID
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Extract first and last name for tracking
    const [firstName, ...lastNameParts] = data.name.split(' ');
    const lastName = lastNameParts.join(' ');

    // Prepare treatment type mapping
    const treatmentMap: Record<string, string> = {
      "invisalign": "Invisalign",
      "tannbleking": "Tannbleking",
      "tannimplantat": "Tannimplantat",
      "tannrens": "Tannrens",
      "rotfylling": "Rotfylling",
      "tannkroner": "Tannkroner"
    };

    // Get treatment value (for conversion tracking)
    const treatmentValues: Record<string, number> = {
      "invisalign": 45000,
      "tannbleking": 3500,
      "tannimplantat": 25000,
      "tannrens": 1200,
      "rotfylling": 7500,
      "tannkroner": 9500
    };

    const treatmentValue = data.treatment ? treatmentValues[data.treatment] || 2000 : 2000;
    const formattedTreatment = data.treatment ? treatmentMap[data.treatment] || data.treatment : "Generell henvendelse";

    // Prepare lead data object
    const leadData = {
      id: leadId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      treatment: formattedTreatment,
      message: data.message,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      source: data.source || request.headers.get('referer') || 'direct',
      landingPage: data.landingPage || request.headers.get('referer'),
      timestamp: new Date().toISOString(),
      status: 'new',
      forwarded: false,
      handledBy: null
    };

    // Store lead data in memory (would be a database in production)
    leadsStorage[leadId] = leadData;
    console.log('New lead captured and stored with ID:', leadId);

    // Send notification to Discord (primary notification method)
    let discordSuccess = false;
    try {
      const { title, fields, footer } = formatLeadForDiscord(leadData);
      discordSuccess = await sendDiscordNotification('lead', title, fields, undefined, footer);
      if (discordSuccess) {
        console.log('Discord notification sent successfully');
      } else {
        console.warn('Discord notification failed to send');
      }
    } catch (discordError) {
      console.error('Error in Discord notification process:', discordError);
    }

    // If Discord fails, always send email as backup
    if (!discordSuccess) {
      try {
        // Build email content for backup
        const emailContent = `
          <h1>Ny lønsom pasientemne fra nettstedet</h1>
          <h2>Kontaktinformasjon:</h2>
          <p><strong>Navn:</strong> ${data.name}</p>
          <p><strong>E-post:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          
          <h2>Henvendelsesdetaljer:</h2>
          <p><strong>Ønsket behandling:</strong> ${formattedTreatment}</p>
          ${data.preferredDate ? `<p><strong>Ønsket dato:</strong> ${data.preferredDate}</p>` : ""}
          ${data.preferredTime ? `<p><strong>Ønsket tidspunkt:</strong> ${data.preferredTime}</p>` : ""}
          ${data.message ? `<p><strong>Melding:</strong> ${data.message}</p>` : ""}
          
          <p><strong>Kilde:</strong> ${data.source || request.headers.get('referer') || 'Direkte besøk'}</p>
          <p><strong>Landingsside:</strong> ${data.landingPage || request.headers.get('referer')}</p>
          <p><strong>UTM-parametere:</strong> ${data.utm || 'Ingen'}</p>
          
          <p><em>Discord-varsling feilet, dette er en backup-epost.</em></p>
          <p><em>Dette er en del av vårt arbeid for å øke antall pasienter til klinikken.</em></p>
          <p><em>Vennligst kontakt pasientemnet så snart som mulig for best konvertering.</em></p>
        `;

        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          await transporter.sendMail({
            from: `"Dident Nettside" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: "nicolai@vekstboost.no, nicolai@onedevconsultancy.no",
            subject: `[BACKUP] Ny pasientemne: ${formattedTreatment} - ${data.name}`,
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

    // In this implementation, we're not sending to the actual clinic yet
    // This will happen once we prove value or through our internal team
    // Set ENABLE_EMAIL_TO_CLINIC to true when ready to forward to the clinic
    const ENABLE_EMAIL_TO_CLINIC = false;
    if (ENABLE_EMAIL_TO_CLINIC && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        // Build email content for clinic
        const emailContent = `
          <h1>Ny lønsom pasientemne fra nettstedet</h1>
          <h2>Kontaktinformasjon:</h2>
          <p><strong>Navn:</strong> ${data.name}</p>
          <p><strong>E-post:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          
          <h2>Henvendelsesdetaljer:</h2>
          <p><strong>Ønsket behandling:</strong> ${formattedTreatment}</p>
          ${data.preferredDate ? `<p><strong>Ønsket dato:</strong> ${data.preferredDate}</p>` : ""}
          ${data.preferredTime ? `<p><strong>Ønsket tidspunkt:</strong> ${data.preferredTime}</p>` : ""}
          ${data.message ? `<p><strong>Melding:</strong> ${data.message}</p>` : ""}
          
          <p><strong>Kilde:</strong> ${data.source || request.headers.get('referer') || 'Direkte besøk'}</p>
          <p><strong>Landingsside:</strong> ${data.landingPage || request.headers.get('referer')}</p>
          <p><strong>UTM-parametere:</strong> ${data.utm || 'Ingen'}</p>
          
          <p><em>Denne henvendelsen ble automatisk generert fra det nye nettstedet vi har utviklet.</em></p>
          <p><em>Dette er en del av vårt arbeid for å øke antall pasienter til klinikken.</em></p>
          <p><em>Vennligst kontakt pasientemnet så snart som mulig for best konvertering.</em></p>
        `;

        await transporter.sendMail({
          from: `"Dident Nettside" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || "post@dident.no",
          cc: "nicolai@vekstboost.no, nicolai@onedevconsultancy.no",
          subject: `Ny pasientemne: ${formattedTreatment} - ${data.name}`,
          html: emailContent,
          replyTo: data.email,
        });
        console.log('Email sent to clinic');
        
        // Update lead status when forwarded to clinic
        if (leadsStorage[leadId]) {
          leadsStorage[leadId].forwarded = true;
          leadsStorage[leadId].forwardedAt = new Date().toISOString();
        }
      } catch (emailError) {
        console.error('Error sending email to clinic:', emailError);
        // Continue even if email fails
      }
    }

    // Track conversion event for analytics
    try {
      // Prepare Facebook Conversion API event
      const fbEvent = {
        event_name: 'Lead',
        event_id: leadId,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: hashData(data.email),
          ph: hashData(data.phone),
          fn: hashData(firstName),
          ln: lastName ? hashData(lastName) : undefined,
          client_ip_address: request.headers.get('x-forwarded-for') || '127.0.0.1',
          client_user_agent: request.headers.get('user-agent') || 'Unknown',
          fbc: data.fbc,
          fbp: data.fbp
        },
        custom_data: {
          value: treatmentValue,
          currency: 'NOK',
          content_name: formattedTreatment,
          content_category: 'Dental Services',
          content_ids: [data.treatment || 'general_inquiry'],
          status: 'submitted',
          lead_type: data.treatment ? 'treatment_specific' : 'general'
        },
        event_source_url: data.landingPage || request.headers.get('referer') || 'https://dident.no',
        action_source: 'website'
      };

      // Send to Facebook CAPI
      await sendToFacebookAPI(fbEvent);
      console.log('Conversion event tracked');
    } catch (trackingError) {
      console.error('Error tracking conversion event:', trackingError);
      // Continue even if tracking fails
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead captured successfully",
      leadId
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    
    // Try to send error notification to Discord
    try {
      await sendDiscordNotification('error', 'Lead Processing Error', [
        {
          name: 'Error Details',
          value: `${error}`,
          inline: false
        }
      ], 'An error occurred while processing a lead from the website.');
    } catch (notifyError) {
      console.error('Failed to send error notification:', notifyError);
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 