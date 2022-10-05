import express from 'express';
import groupController from '../../../../controllers/group/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import groupSchema from '../../../../validators/joi/schema/groupSchema.js';
import guard from '../../../../guards/index.js'
import catchAsync from '../../../../utils/catchAsync.js';

const router = express.Router();

router
    .get('/', guard.jwt, catchAsync(groupController.getAllGroups))
    .post('/', guard.jwt, joiValidator(groupSchema.createGroup), catchAsync(groupController.createGroup))
    .post('/:id/monitor/:monitorId', guard.jwt, catchAsync(groupController.addMonitorToGroup))
    .delete('/:id/monitor/:monitorId', guard.jwt, catchAsync(groupController.removeMonitorFromGroup))
    .put('/:id', guard.jwt, joiValidator(groupSchema.updateGroup), catchAsync(groupController.updateGroup))
    .get('/:id', guard.jwt, catchAsync(groupController.getGroupById))
    .delete('/:id', guard.jwt, catchAsync(groupController.deleteGroup))

export default router;