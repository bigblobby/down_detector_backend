import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '../routes/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import errorLoggerHandler from '../utils/errors/handlers/errorLoggerHandler.js';
import errorResponseHandler from '../utils/errors/handlers/errorResponseHandler.js';
import morganMiddleware from '../middlewares/morgan.js';

// Init auth strategies
import '../auth/strategies/LocalStrategy.js';
import '../auth/strategies/JwtStrategy.js';

const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));
app.use(passport.initialize());

// Logger
app.use(morganMiddleware);

// Routes
app.use(router);

// Error handlers
app.use(errorLoggerHandler);
app.use(errorResponseHandler);

export default app;