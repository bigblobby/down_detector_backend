import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import authSchema from '../../../../validators/joi/authSchema.js';
import guard from '../../../../guards/index.js'
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';

const router = express.Router();

router.post('/register', joiMiddleware(authSchema.register), errorHandler(controller.register));
router.post('/login', joiMiddleware(authSchema.login), errorHandler(controller.login));
router.get('/logout', errorHandler(controller.logout));
router.get('/protect', guard.jwt, guard.user({isVerified: false}), controller.protect);
router.get('/email/resend-verification', guard.jwt, errorHandler(controller.resendEmailVerification));
router.get('/email/verify/:token', joiMiddleware(authSchema.verifyEmail, 'params'), guard.jwt, errorHandler(controller.verifyEmail));
router.post('/forgot-password', joiMiddleware(authSchema.forgotPassword), errorHandler(controller.sendForgotPassword));
router.post('/change-password', joiMiddleware(authSchema.changePassword), errorHandler(controller.changePassword));

export default router;