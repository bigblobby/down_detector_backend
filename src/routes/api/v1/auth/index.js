import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import authMiddleware from '../../../../middlewares/auth/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import authSchema from '../../../../validators/joi/authSchema.js';

const router = express.Router();

router.post('/register', joiMiddleware(authSchema.register), controller.register);
router.post('/login', joiMiddleware(authSchema.login), controller.login);
router.get('/protect', authMiddleware.jwtConfirm, controller.protect);

export default router;