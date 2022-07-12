import express from 'express';
import controller from '../../../../controllers/service';
import middleware from '../../../../middlewares/service';
import globalMiddleware from '../../../../middlewares/global';

const router = express.Router();

router.post('/check', middleware.preCheckService, globalMiddleware.catchAsync(controller.checkService));

export default router