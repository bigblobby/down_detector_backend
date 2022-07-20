import express from 'express';
import apiV1Router from './api/v1/index.js';

const router = express.Router();

router.use('/api/v1', apiV1Router);

export default router;