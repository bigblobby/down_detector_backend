import express from 'express';
import controller from '../../../../controllers/ping/index.js';
import pingSchema from '../../../../validators/joi/schema/pingSchema.js';
import joiValidator from '../../../../validators/joi/validator.js';
import catchAsync from '../../../../utils/catchAsync.js';
import guard from '../../../../guards/index.js';

const router = express.Router();

// TODO
// 1. change role check to 'ADMIN'
// 2. change isVerified to true, or remove altogether
router
    .get('/monitor/:monitorId', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), catchAsync(controller.getAllPings))
    .post('/', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), joiValidator(pingSchema.createPing), catchAsync(controller.createPing))
    .get('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), catchAsync(controller.getPingById))
    .post('/check', joiValidator(pingSchema.check), catchAsync(controller.check))

// Might delete the update and delete routes. As 'pings' should never really need to be modified once created.
router.put('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), () => {});
router.delete('/:id', guard.jwt, guard.user({isVerified: false}), guard.role({check: 'USER'}), () => {});

export default router;