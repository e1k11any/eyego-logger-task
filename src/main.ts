import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { runLogConsumer } from './interface/consumers/LogConsumer';
import logRoutes from './interface/http/routes/logRoutes';
import { globalErrorHandler } from './interface/http/middlewares/GlobalErrorHandler';

const app = express();

app.use(express.json());

app.use('/api/v1', logRoutes);

app.use(globalErrorHandler);

const bootstrap = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/eyego-logs');
    console.log('MongoDB Connected');

    runLogConsumer().catch((err) => {
      console.error('Kafka Consumer Error:', err);
    });

    app.listen(3000, () => {
      console.log(`Server running on http://localhost:3000`);
    });
  } catch (error) {
    console.error('Fatal Startup Error:', error);
    process.exit(1);
  }
};

bootstrap();
