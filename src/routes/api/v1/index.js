import express from 'express';
import pingRouter from './ping/index.js';
import authRouter from './auth/index.js';
import monitorRouter from './monitor/index.js';
import groupRouter from './group/index.js';
import healthRouter from './health/index.js';

const router = express.Router();

router.use('/ping', pingRouter);
router.use('/auth', authRouter);
router.use('/monitor', monitorRouter);
router.use('/group', groupRouter);
router.use('/health', healthRouter);

export default router;