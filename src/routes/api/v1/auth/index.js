import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import authSchema from '../../../../validators/joi/schema/authSchema.js';
import guard from '../../../../guards/index.js'
import catchAsync from '../../../../utils/catchAsync.js';

const router = express.Router();

router.post('/register', joiValidator(authSchema.register), catchAsync(controller.register));
router.post('/login', joiValidator(authSchema.login), catchAsync(controller.login));
router.get('/logout', catchAsync(controller.logout));
router.get('/protect', guard.jwt, guard.user({isVerified: false}), controller.protect);
router.get('/email/resend-verification', guard.jwt, catchAsync(controller.resendEmailVerification));
router.get('/email/verify/:token', guard.jwt, joiValidator(authSchema.verifyEmail, 'params'), catchAsync(controller.verifyEmail));
router.post('/forgot-password', joiValidator(authSchema.forgotPassword), catchAsync(controller.sendForgotPassword));
router.post('/change-password', joiValidator(authSchema.changePassword), catchAsync(controller.changePassword));
router.put('/user-settings', guard.jwt, joiValidator(authSchema.userSettings), catchAsync(controller.updateUserSettings))
router.get('/refresh', catchAsync(controller.refresh))

export default router;