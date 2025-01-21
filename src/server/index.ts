import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { leadRouter } from './routes/leads';
import { trackingRouter } from './routes/tracking';
import { errorHandler } from './middleware/errorHandler';

config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRouter);
app.use('/api/track', trackingRouter);

// Error handling
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 