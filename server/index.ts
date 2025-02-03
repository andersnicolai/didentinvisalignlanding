import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { leadsRouter } from './routes/leads';
import { trackConversionRouter } from './routes/track-conversion';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With']
}));

app.use(express.json());

// Legg til debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.json({ status: 'API is running' });
});

app.use('/api/track/conversion', trackConversionRouter);
app.use('/api/leads', leadsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Available routes:');
  console.log('- GET  /api/health');
  console.log('- POST /api/track/conversion');
  console.log('- POST /api/leads');
}); 