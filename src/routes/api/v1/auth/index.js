import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import authMiddleware from '../../../../middlewares/auth/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import authSchema from '../../../../validators/joi/authSchema.js';

const router = express.Router();

router.post('/register', [joiMiddleware(authSchema.register), controller.register]);
router.post('/login', joiMiddleware(authSchema.login), controller.login);
router.get('/logout', controller.logout);
router.get('/protect', authMiddleware.jwtConfirm, controller.protect);
router.get('/email/resend-verification', authMiddleware.jwtConfirm, controller.resendEmailVerification);
router.get('/email/verify/:token', authMiddleware.jwtConfirm, controller.verifyEmail);
router.post('/forgot-password', joiMiddleware(authSchema.forgotPassword), controller.sendForgotPassword);
router.post('/change-password', joiMiddleware(authSchema.changePassword), controller.changePassword);

export default router;