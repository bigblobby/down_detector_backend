import Joi from 'joi';

export default {
    register: Joi.object().keys({
        username: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().required().min(4),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().trim().required(),
        password: Joi.string().required().min(4),
    }).required().min(1),
    forgotPassword: Joi.object().keys({
        email: Joi.string().email().trim().required(),
    }).required().min(1),
    changePassword: Joi.object().keys({
        token: Joi.string().required().min(36),
        password: Joi.string().required().min(4),
    }).required().min(1),
    verifyEmail: Joi.object().keys({
        token: Joi.string().required().min(36),
    }).required().min(1),
    userSettings: Joi.object().keys({
        theme: Joi.string(),
    }).required().min(1)
}