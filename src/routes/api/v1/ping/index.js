import express from 'express';
import controller from '../../../../controllers/ping/index.js';
import pingSchema from '../../../../validators/joi/schema/pingSchema.js';
import joiValidator from '../../../../validators/joi/validator.js';
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';

const router = express.Router();

router.post('/check', joiValidator(pingSchema.check), errorHandler(controller.check));

export default router;