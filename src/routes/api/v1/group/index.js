import express from 'express';
import groupController from '../../../../controllers/group/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import groupSchema from '../../../../validators/joi/groupSchema.js';
import guard from '../../../../guards/index.js'

const router = express.Router();

router.get('/', guard.jwt, groupController.getAllGroups)
router.post('/', guard.jwt, joiMiddleware(groupSchema.createGroup), groupController.createGroup)
router.post('/:id/monitor/:monitorId', guard.jwt, groupController.addMonitorToGroup)
router.delete('/:id/monitor/:monitorId', guard.jwt, groupController.removeMonitorFromGroup)
router.put('/:id', guard.jwt, joiMiddleware(groupSchema.updateGroup), groupController.updateGroup)
router.get('/:id', guard.jwt, groupController.getGroupById)
router.delete('/:id', guard.jwt, groupController.deleteGroup)

export default router;