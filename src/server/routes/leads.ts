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
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`,
      {
        data: [event],
        access_token: process.env.FB_ACCESS_TOKEN,
        test_event_code: process.env.NODE_ENV === 'development' ? 'TEST62496' : undefined
      }
    );
  } catch (error) {
    console.error('Facebook API Error:', error);
  }
};

router.post('/', async (req, res) => {
  try {
    // Send to GoHighLevel
    const ghlResponse = await axios.post(
      'https://rest.gohighlevel.com/v1/contacts/',
      {
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstName,
        tags: ["Bleking Kampanje"],
        source: req.body.source,
        customField: {
          campaign: req.body.campaign,
          landingPage: req.body.landingPage
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`
        }
      }
    );

    // Send til Facebook CAPI
    await sendToFacebookAPI({
      event_name: 'Lead',
      event_id: Date.now().toString(),
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        em: hashData(req.body.email),
        ph: hashData(req.body.phone),
        client_ip_address: req.ip || '127.0.0.1',
        client_user_agent: req.headers['user-agent'] || 'Unknown'
      },
      custom_data: {
        value: 1995.00,
        currency: 'NOK',
        lead_type: 'Tannbleking'
      },
      event_source_url: 'https://kampanje.dident.no/tilbud/bleking'
    });

    // Log lead i database
    // TODO: Implementer database logging

    res.json({ success: true, data: ghlResponse.data });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error?.message || 'Unknown error'
    });
  }
});

export { router as leadRouter }; 