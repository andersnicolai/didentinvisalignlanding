import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1371921733023694939/ap5nLwqvrByoSQ6sQRJFSbZ414y4oOIBJ4k43l0EQCBiENPPjgoydmu3dfIXuYqeHfXP';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, selectedDate, selectedTime, agreement } = body;

    // Validate required fields
    if (!name || !email || !phone || !selectedDate || !selectedTime) {
      return NextResponse.json(
        { error: 'Alle påkrevde felt må fylles ut' },
        { status: 400 }
      );
    }

    // Format date for Discord message
    const formattedDate = new Date(selectedDate).toLocaleDateString('no-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create Discord embed message
    const discordMessage = {
      embeds: [
        {
          title: "🦷 Ny Tannlegetime Bestilt!",
          color: 0x4A6741, // Sage green color
          fields: [
            {
              name: "👤 Navn",
              value: name,
              inline: true
            },
            {
              name: "📧 E-post",
              value: email,
              inline: true
            },
            {
              name: "📱 Telefon",
              value: phone,
              inline: true
            },
            {
              name: "📅 Dato",
              value: formattedDate,
              inline: true
            },
            {
              name: "🕐 Tid",
              value: selectedTime,
              inline: true
            },
            {
              name: "✅ Samtykke",
              value: agreement ? "Ja" : "Nei",
              inline: true
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Dident Tannlegesenter - Booking System"
          }
        }
      ]
    };

    // Send to Discord webhook
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    });

    if (!discordResponse.ok) {
      console.error('Discord webhook failed:', await discordResponse.text());
      return NextResponse.json(
        { error: 'Kunne ikke sende booking til Discord' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking sendt til Discord!',
      data: {
        name,
        email,
        phone,
        selectedDate: formattedDate,
        selectedTime
      }
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
} 