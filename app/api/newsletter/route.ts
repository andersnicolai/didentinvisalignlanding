import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1371921733023694939/ap5nLwqvrByoSQ6sQRJFSbZ414y4oOIBJ4k43l0EQCBiENPPjgoydmu3dfIXuYqeHfXP';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'E-post er påkrevd' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ugyldig e-postformat' }, { status: 400 });
    }

    // Send to Discord
    const discordPayload = {
      content: '📧 **NYHETSBREV** - Ny påmelding!',
      embeds: [
        {
          title: '📧 Nyhetsbrev Påmelding',
          color: 0x4A6741, // Dident green color
          fields: [
            {
              name: '📧 E-post',
              value: email,
              inline: true
            },
            {
              name: '📅 Dato',
              value: new Date().toLocaleString('no-NO', {
                timeZone: 'Europe/Oslo',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }),
              inline: true
            },
            {
              name: '🌐 Kilde',
              value: 'Dident.no - Footer Nyhetsbrev',
              inline: false
            }
          ],
          footer: {
            text: 'Dident Tannklinikk - Nyhetsbrev System',
            icon_url: 'https://dident.no/images/logo/logo-square.png'
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!discordResponse.ok) {
      console.error('Discord webhook failed:', discordResponse.status, discordResponse.statusText);
      return NextResponse.json({ error: 'Kunne ikke sende nyhetsbrev-påmelding' }, { status: 500 });
    }

    console.log('Newsletter subscription sent to Discord successfully');
    return NextResponse.json({ 
      success: true, 
      message: 'Takk for at du meldte deg på vårt nyhetsbrev!' 
    });

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json({ error: 'Intern serverfeil' }, { status: 500 });
  }
} 