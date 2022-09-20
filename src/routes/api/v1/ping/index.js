import express from 'express';
import controller from '../../../../controllers/ping/index.js';
import pingSchema from '../../../../validators/joi/schema/pingSchema.js';
import joiValidator from '../../../../validators/joi/validator.js';
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';
import guard from '../../../../guards/index.js';

const router = express.Router();

// TODO
// 1. change role check to 'ADMIN'
// 2. change isVerified to true, or remove altogether
router.get('/monitor/:monitorId', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), errorHandler(controller.getAllPings));
router.post('/', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), joiValidator(pingSchema.createPing), errorHandler(controller.createPing));
router.get('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), errorHandler(controller.getPingById));
router.post('/check', joiValidator(pingSchema.check), errorHandler(controller.check));

// Might delete the update and delete routes. As 'pings' should never really need to be modified once created.
router.put('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), () => {});
router.delete('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), () => {});

export default router;