import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '1mb' }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : '*',
    credentials: true,
  })
);
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Basic rate limit on the API surface
app.use(
  '/api',
  rateLimit({ windowMs: 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false })
);

app.get('/', (req, res) => res.json({ service: 'Sacred Knowledge API', docs: '/api/health' }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`[server] Sacred Knowledge API listening on :${PORT}`));
  } catch (err) {
    console.error('[server] failed to start:', err.message);
    process.exit(1);
  }
}

start();

export default app;
