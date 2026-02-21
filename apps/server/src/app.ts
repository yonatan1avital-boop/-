import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import { env } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/error-handler';

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use('/api/v1/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', service: 'lavision-server' }));
app.use(env.API_PREFIX, apiRouter);
app.use(errorHandler);
