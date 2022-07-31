import express from 'express';
import serviceRouter from './service/index.js';
import authRouter from './auth/index.js';

const router = express.Router();

router.use('/service', serviceRouter);
router.use('/auth', authRouter);

export default router;