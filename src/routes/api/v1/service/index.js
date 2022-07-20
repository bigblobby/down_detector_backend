import express from 'express';
import controller from '../../../../controllers/service/index.js';
import middleware from '../../../../middlewares/service/index.js';
import globalMiddleware from '../../../../middlewares/global/index.js';

const router = express.Router();

router.post('/check', middleware.preCheckService, globalMiddleware.catchAsync(controller.checkService));
router.get('/test', globalMiddleware.catchAsync(controller.getUsers));

export default router