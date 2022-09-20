import express from 'express';
import groupController from '../../../../controllers/group/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import groupSchema from '../../../../validators/joi/schema/groupSchema.js';
import guard from '../../../../guards/index.js'
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';

const router = express.Router();

router.get('/', guard.jwt, errorHandler(groupController.getAllGroups))
router.post('/', guard.jwt, joiValidator(groupSchema.createGroup), errorHandler(groupController.createGroup))
router.post('/:id/monitor/:monitorId', guard.jwt, errorHandler(groupController.addMonitorToGroup))
router.delete('/:id/monitor/:monitorId', guard.jwt, errorHandler(groupController.removeMonitorFromGroup))
router.put('/:id', guard.jwt, joiValidator(groupSchema.updateGroup), errorHandler(groupController.updateGroup))
router.get('/:id', guard.jwt, errorHandler(groupController.getGroupById))
router.delete('/:id', guard.jwt, errorHandler(groupController.deleteGroup))

export default router;