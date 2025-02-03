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
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`,
      {
        data: [event],
        access_token: process.env.FB_ACCESS_TOKEN,
        partner_agent: "dident_capi_nodejs",
        test_event_code: process.env.NODE_ENV === 'development' ? 'TEST62496' : undefined
      }
    );
    
    console.log('Facebook CAPI Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Facebook CAPI Error:', error);
    throw error;
  }
};

const handleTracking: RequestHandler = async (req, res, next) => {
  try {
    const { event_name, value, user_data, session, properties } = req.body;
    console.log('Received tracking data:', JSON.stringify({ 
      event_name, 
      value, 
      user_data, 
      session, 
      properties 
    }, null, 2));

    if (!process.env.FB_ACCESS_TOKEN) {
      console.error('FB_ACCESS_TOKEN is missing');
      res.status(500).json({ error: 'FB_ACCESS_TOKEN is not configured' });
      return;
    }

    if (!process.env.FB_PIXEL_ID) {
      console.error('FB_PIXEL_ID is missing');
      res.status(500).json({ error: 'FB_PIXEL_ID is not configured' });
      return;
    }

    try {
      const fbEvent: FacebookEvent = {
        event_name: event_name,
        event_id: req.body.event_id,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: user_data?.email ? hashData(user_data.email) : undefined,
          ph: user_data?.phone ? hashData(user_data.phone) : undefined,
          client_ip_address: req.ip || req.headers['x-forwarded-for'] as string || '127.0.0.1',
          client_user_agent: req.headers['user-agent'] || 'Unknown',
          fbc: req.body.fbc,
          fbp: req.body.fbp
        },
        custom_data: {
          value: value,
          currency: 'NOK',
          content_name: req.body.content_name,
          content_category: req.body.content_category,
          ...properties
        },
        event_source_url: session?.path || 'https://kampanje.dident.no',
        action_source: 'website' as const
      };

      console.log('Sending to Facebook:', JSON.stringify(fbEvent, null, 2));
      
      const response = await sendToFacebookAPI(fbEvent);
      console.log('Facebook API Response:', response);

      res.status(200).json({ 
        success: true,
        fbResponse: response
      });
    } catch (fbError) {
      console.error('Facebook API Error:', fbError.response?.data || fbError);
      res.status(200).json({ 
        success: true,
        fbError: fbError.response?.data || fbError.message
      });
    }
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ 
      error: 'Failed to track conversion',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

router.post('/', handleTracking);

export const trackConversionRouter = router; 