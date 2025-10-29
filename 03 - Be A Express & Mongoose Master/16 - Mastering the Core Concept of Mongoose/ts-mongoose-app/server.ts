import express from 'express';
import type { Express } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import noteRouter from './routes/noteRoutes.js';

// Load environment variables
config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Mount the notes router
app.use('/notes', noteRouter);

// Connect to MongoDB and start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
