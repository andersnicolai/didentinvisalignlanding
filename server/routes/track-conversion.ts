import { Router } from 'express';
import axios from 'axios';
import { hashData } from "../utils/hash";

const router = Router();

interface FacebookEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  user_data: {
    em?: string;
    ph?: string;
    client_ip_address: string;
    client_user_agent: string;
  };
  custom_data?: Record<string, unknown>;
  event_source_url: string;
}

const sendToFacebookAPI = async (event: FacebookEvent) => {
  try {
    console.log('Using Pixel ID:', process.env.FB_PIXEL_ID);
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`,
      {
        data: [event],
        access_token: process.env.FB_ACCESS_TOKEN,
        test_event_code: 'TEST58068'
      }
    );
    console.log('Facebook API Response:', response.data);
  } catch (error) {
    console.error('Facebook API Error:', error);
    throw error;
  }
};

router.post('/', async (req, res) => {
  try {
    console.log('Received conversion tracking request:', req.body);
    
    // Send to Facebook CAPI
    await sendToFacebookAPI({
      event_name: 'Purchase',  // eller 'Lead' avhengig av konverteringstypen
      event_id: `conv_${Date.now()}`,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: req.body.email ? hashData(req.body.email) : undefined,
        ph: req.body.phone ? hashData(req.body.phone) : undefined,
        client_ip_address: req.ip || '127.0.0.1',
        client_user_agent: req.headers['user-agent'] || 'Unknown'
      },
      custom_data: {
        value: req.body.value || 1995.00,
        currency: 'NOK'
      },
      event_source_url: req.body.source || 'https://kampanje.dident.no'
    });

    res.status(200).json({ message: 'Conversion tracked successfully' });
  } catch (error) {
    console.error('Error tracking conversion:', error);
    res.status(500).json({ error: 'Failed to track conversion' });
  }
});

export const trackConversionRouter = router; 