/* global process */
// Validate required environment FIRST — this import must stay at the top so
// the check runs before routes/services (e.g. the Supabase client) load.
import './config/validateEnv.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import lessonRoutes from './routes/lessons.js';
import quizRoutes from './routes/quiz.js';
import progressRoutes from './routes/progress.js';

// Load environment variables (required variables were already validated by
// config/validateEnv.js above — the server exits before this point if any
// are missing or too weak)
dotenv.config();

import { supabase } from './services/supabase.js';

const app = express();
app.locals.supabase = supabase;
const PORT = process.env.PORT || 5000;

// Security Middleware
// Helmet.js - Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for development
  })
);

// Rate limiting - Apply to all requests
app.use('/api/', apiLimiter);

// Middleware to allow Private Network Access (for accessing localhost from public URL)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

// CORS allowlist. Set CORS_ORIGIN (comma-separated list of origins) in the
// environment to override; when it is not set, the historical defaults below
// are used so existing deployments keep working.
const defaultCorsOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'https://tka-ardhi.netlify.app',
  'https://ardhisasongko.github.io',
].filter(Boolean); // Remove undefined values
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultCorsOrigins;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Private-Network'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }),
);

// Explicitly handle OPTIONS requests for Private Network Access.
// Only reflect the Origin header when it is on the CORS allowlist — never
// echo arbitrary origins together with credentials.
app.options('*', (req, res) => { // checks for any OPTIONS request
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Private-Network');
  res.sendStatus(204);
});
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoints (no sensitive data — safe for uptime monitors)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Don't expose internal error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'An error occurred. Please try again later.',
    ...(isDevelopment && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 LMS Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
