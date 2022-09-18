import express from 'express';
import serviceRouter from './service/index.js';
import authRouter from './auth/index.js';
import monitorRouter from './monitor/index.js';
import groupRouter from './group/index.js';

const router = express.Router();

router.use('/service', serviceRouter);
router.use('/auth', authRouter);
router.use('/monitor', monitorRouter);
router.use('/group', groupRouter);

export default router;