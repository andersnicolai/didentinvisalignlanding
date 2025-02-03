import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { leadsRouter } from './routes/leads';
import { trackConversionRouter } from './routes/track-conversion';

// Last inn miljøvariabler
config();

// Verifiser nødvendige miljøvariabler
const requiredEnvVars = ['FB_ACCESS_TOKEN', 'FB_PIXEL_ID'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://kampanje.dident.no',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With']
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/track/conversion', trackConversionRouter);
app.use('/api/leads', leadsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
  console.log('Environment variables loaded:', {
    FB_PIXEL_ID: process.env.FB_PIXEL_ID ? 'Set' : 'Missing',
    FB_ACCESS_TOKEN: process.env.FB_ACCESS_TOKEN ? 'Set' : 'Missing',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://kampanje.dident.no'
  });
}); 