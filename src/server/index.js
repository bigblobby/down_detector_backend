import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '../routes/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';

// Init auth strategies
import '../auth/strategies/LocalStrategy.js';
import '../auth/strategies/JwtStrategy.js';

const app = express();

// Middleware
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true, }));
app.use(passport.initialize());

// Routes
app.use(router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    // TODO create an error handling ping
    res.status(err.statusCode || 500).json({error: err.name || 'UnhandledException', statusCode: err.statusCode || 500, message: err.message || "Something is broken" });
})

export default app;