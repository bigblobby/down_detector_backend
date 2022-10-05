import express from 'express';
import controller from '../../../../controllers/auth/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import authSchema from '../../../../validators/joi/schema/authSchema.js';
import guard from '../../../../guards/index.js'
import catchAsync from '../../../../utils/catchAsync.js';

const router = express.Router();

router
    .post('/register', joiValidator(authSchema.register), catchAsync(controller.register))
    .post('/login', joiValidator(authSchema.login), catchAsync(controller.login))
    .get('/logout', catchAsync(controller.logout))
    .get('/protect', guard.jwt, guard.user({isVerified: false}), controller.protect)
    .get('/email/resend-verification', guard.jwt, catchAsync(controller.resendEmailVerification))
    .get('/email/verify/:token', guard.jwt, joiValidator(authSchema.verifyEmail, 'params'), catchAsync(controller.verifyEmail))
    .post('/forgot-password', joiValidator(authSchema.forgotPassword), catchAsync(controller.sendForgotPassword))
    .post('/change-password', joiValidator(authSchema.changePassword), catchAsync(controller.changePassword))
    .put('/user-settings', guard.jwt, joiValidator(authSchema.userSettings), catchAsync(controller.updateUserSettings))
    .get('/refresh', catchAsync(controller.refresh))

//Admin
router
    .post('/invalidate-user', guard.jwt, guard.role({check: 'ADMIN'}), controller.logoutUser)

export default router;