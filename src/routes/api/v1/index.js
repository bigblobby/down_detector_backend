import express from 'express';
import serviceRouter from './service/index.js';

const router = express.Router();

router.use('/service', serviceRouter);

export default router;