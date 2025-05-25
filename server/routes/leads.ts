import { Router, Request, Response, RequestHandler } from 'express';
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
    fbc?: string;
    fbp?: string;
  };
  custom_data?: Record<string, unknown>;
  event_source_url: string;
  action_source: 'website';  // Literal type
}

const sendToFacebookAPI = async (event: FacebookEvent) => {
  try {
    console.log('Sending to Facebook API:', event);
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`,
      {
        data: [event],
        access_token: process.env.FB_ACCESS_TOKEN,
        partner_agent: "dident_capi_nodejs",
        test_event_code: process.env.NODE_ENV === 'development' ? 'TEST58068' : undefined
      }
    );
    console.log('Facebook API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Facebook API Error:', error);
    throw error;
  }
};

const handleLead: RequestHandler = async (req, res, next) => {
  try {
    console.log('Received lead:', req.body);

    if (!process.env.FB_ACCESS_TOKEN) {
      console.error('FB_ACCESS_TOKEN is missing');
      res.status(500).json({ error: 'FB_ACCESS_TOKEN is not configured' });
      return;
    }

    try {
      const fbEvent: FacebookEvent = {
        event_name: 'Lead',
        event_id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: hashData(req.body.email),
          ph: hashData(req.body.phone),
          client_ip_address: req.ip || req.headers['x-forwarded-for'] as string || '127.0.0.1',
          client_user_agent: req.headers['user-agent'] || 'Unknown',
          fbc: req.body.fbc,
          fbp: req.body.fbp
        },
        custom_data: {
          value: 1200.00,
          currency: 'NOK',
          content_name: 'Tannlegekonsultasjon',
          content_category: 'Dental Services',
          content_type: 'service',
          content_ids: ['tannlege_konsultasjon'],
          delivery_category: 'in_person',
          status: 'submitted',
          service_type: 'konsultasjon',
          is_free_service: false,
          booking_date: req.body.date,
          booking_time: req.body.time
        },
        event_source_url: req.body.landingPage || 'https://kampanje.dident.no',
        action_source: 'website' as const
      };

      await sendToFacebookAPI(fbEvent);
      res.status(200).json({ message: 'Lead received successfully' });
      return;
    } catch (fbError) {
      console.error('Facebook API Error:', fbError);
      res.status(200).json({ 
        message: 'Lead received but Facebook tracking failed',
        fbError: fbError.message
      });
      return;
    }
  } catch (error) {
    console.error('Error handling lead:', error);
    res.status(500).json({ 
      error: 'Failed to handle lead',
      details: error.message 
    });
    return;
  }
};

router.post('/', handleLead);

export const leadsRouter = router; 