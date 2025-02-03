import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { leadsRouter } from './routes/leads';
import { trackingRouter } from './routes/tracking';
import { errorHandler } from './middleware/errorHandler';
import axios from 'axios';
import formRouter from './routes/forms';

config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://kampanje.dident.no',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
  optionsSuccessStatus: 204,
  preflightContinue: false
};

// Pre-flight OPTIONS handling
app.options('*', cors(corsOptions));

// Enable CORS for all routes
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());

// Add CORS headers to all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'https://kampanje.dident.no');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
  next();
});

// Routes
app.use('/api/leads', leadsRouter);
app.use('/api/track', trackingRouter);
app.use('/api', formRouter);

// Facebook Conversions API endpoint
app.post('/api/track-conversion', async (req, res) => {
  try {
    const { eventName, userData, customData } = req.body;

    const data = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          ...userData,
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.ip,
        },
        custom_data: customData
      }],
      access_token: process.env.FACEBOOK_ACCESS_TOKEN,
      pixel_id: process.env.FACEBOOK_PIXEL_ID,
    };

    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.FACEBOOK_PIXEL_ID}/events`,
      data
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Facebook Conversion API Error:', error);
    res.status(500).json({ success: false, error: 'Failed to track conversion' });
  }
});

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS enabled for origin: ${process.env.CORS_ORIGIN || 'https://kampanje.dident.no'}`);
}); 