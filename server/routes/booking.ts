import { Router, Request, Response, RequestHandler } from 'express';
import axios from 'axios';

const router = Router();

const handleBooking: RequestHandler = async (req, res, next) => {
  try {
    console.log('Received booking:', req.body);

    const { name, email, phone, selectedDate, selectedTime, agreement } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !selectedDate || !selectedTime) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Send to Discord webhook
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not configured');
      res.status(500).json({ error: 'Discord webhook not configured' });
      return;
    }

    try {
      await axios.post(discordWebhookUrl, {
        content: '🦷 **Ny timebestilling fra Dident!**',
        embeds: [
          {
            title: 'Timebestilling - Tannlegekonsultasjon',
            color: 0x4A6741, // Green color matching the website
            fields: [
              {
                name: '👤 Navn',
                value: name,
                inline: true
              },
              {
                name: '📧 E-post',
                value: email,
                inline: true
              },
              {
                name: '📞 Telefon',
                value: phone,
                inline: true
              },
              {
                name: '📅 Dato',
                value: selectedDate,
                inline: true
              },
              {
                name: '🕐 Tid',
                value: selectedTime,
                inline: true
              },
              {
                name: '✅ Samtykke',
                value: agreement ? 'Ja' : 'Nei',
                inline: true
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Dident Tannklinikk - kampanje.dident.no'
            }
          }
        ]
      });

      console.log('Booking sent to Discord successfully');
      res.status(200).json({ 
        success: true,
        message: 'Booking received successfully' 
      });
      return;
    } catch (discordError) {
      console.error('Discord webhook error:', discordError);
      res.status(500).json({ 
        error: 'Failed to send booking to Discord',
        details: discordError.message 
      });
      return;
    }
  } catch (error) {
    console.error('Error handling booking:', error);
    res.status(500).json({ 
      error: 'Failed to handle booking',
      details: error.message 
    });
    return;
  }
};

router.post('/', handleBooking);

export const bookingRouter = router; 