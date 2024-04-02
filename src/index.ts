import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import mongoose, { ConnectOptions } from 'mongoose';
import { startServer } from './server';

const PORT: number = (process.env.PORT as unknown as number) || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    startServer(PORT);
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
