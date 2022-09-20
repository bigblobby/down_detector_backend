import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import authSchema from '../../../../validators/joi/schema/authSchema.js';
import guard from '../../../../guards/index.js'
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';

const router = express.Router();

router.post('/register', joiValidator(authSchema.register), errorHandler(controller.register));
router.post('/login', joiValidator(authSchema.login), errorHandler(controller.login));
router.get('/logout', errorHandler(controller.logout));
router.get('/protect', guard.jwt, guard.user({isVerified: false}), controller.protect);
router.get('/email/resend-verification', guard.jwt, errorHandler(controller.resendEmailVerification));
router.get('/email/verify/:token', joiValidator(authSchema.verifyEmail, 'params'), guard.jwt, errorHandler(controller.verifyEmail));
router.post('/forgot-password', joiValidator(authSchema.forgotPassword), errorHandler(controller.sendForgotPassword));
router.post('/change-password', joiValidator(authSchema.changePassword), errorHandler(controller.changePassword));

export default router;