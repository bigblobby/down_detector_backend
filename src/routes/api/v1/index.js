import express from 'express';
import serviceRouter from './service/index.js';
import authRouter from './auth/index.js';
import monitorRouter from './monitor/index.js';

const router = express.Router();

router.use('/service', serviceRouter);
router.use('/auth', authRouter);
router.use('/monitor', monitorRouter);

export default router;