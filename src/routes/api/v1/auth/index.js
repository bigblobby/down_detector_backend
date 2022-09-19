import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import authSchema from '../../../../validators/joi/authSchema.js';
import guard from '../../../../guards/index.js'

const router = express.Router();

router.post('/register', joiMiddleware(authSchema.register), controller.register);
router.post('/login', joiMiddleware(authSchema.login), controller.login);
router.get('/logout', controller.logout);
router.get('/protect', guard.jwt, guard.user({isActive: false}), controller.protect);
router.get('/email/resend-verification', guard.jwt, controller.resendEmailVerification);
router.get('/email/verify/:token', joiMiddleware(authSchema.verifyEmail, 'params'), guard.jwt, controller.verifyEmail);
router.post('/forgot-password', joiMiddleware(authSchema.forgotPassword), controller.sendForgotPassword);
router.post('/change-password', joiMiddleware(authSchema.changePassword), controller.changePassword);

export default router;