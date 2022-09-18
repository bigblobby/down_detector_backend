import express from "express";
import groupController from "../../../../controllers/group/index.js";
import authMiddleware from "../../../../middlewares/auth/index.js"
import joiMiddleware from "../../../../middlewares/validation/joi.js";
import groupSchema from "../../../../validators/joi/groupSchema.js";

const router = express.Router();

router.get('/', authMiddleware.jwtConfirm, groupController.getAllGroups)
router.post('/', authMiddleware.jwtConfirm, joiMiddleware(groupSchema.createGroup), groupController.createGroup)
router.put('/:id', authMiddleware.jwtConfirm, joiMiddleware(groupSchema.updateGroup), groupController.updateGroup)
router.get('/:id', authMiddleware.jwtConfirm, groupController.getGroupById)
router.delete('/:id', authMiddleware.jwtConfirm, groupController.deleteGroup)

export default router;