import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '../routes/index.js';

// Init auth strategies
import '../auth/strategies/index.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use(router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    // TODO create an error handling service
    res.status(err.statusCode || 500).json({ error: err.message || 'Something broke!', status: err.statusCode || 500 });
})

export default app;