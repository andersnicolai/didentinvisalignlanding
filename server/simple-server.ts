import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { bookingRouter } from './routes/booking';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoints
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Dident Booking API Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount booking router
app.use('/api/booking', bookingRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🦷 Dident Booking API server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Booking endpoint: http://localhost:${port}/api/booking`);
}); 