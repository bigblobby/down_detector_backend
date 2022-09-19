import express from 'express';
import controller from '../../../../controllers/service/index.js';
import globalMiddleware from '../../../../middlewares/global/index.js';
import pingSchema from '../../../../validators/joi/pingSchema.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';

const router = express.Router();

router.post('/check', joiMiddleware(pingSchema.check), globalMiddleware.catchAsync(controller.checkService));

export default router;