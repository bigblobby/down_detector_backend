import Joi from 'joi';

export default {
    register: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4),
    }).required().min(1),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4),
    }).required().min(1),
    forgotPassword: Joi.object().keys({
        email: Joi.string().email().required(),
    }).required().min(1),
    changePassword: Joi.object().keys({
        token: Joi.string().required().min(36),
        password: Joi.string().required().min(4),
    }).required().min(1),
    verifyEmail: Joi.object().keys({
        token: Joi.string().required().min(36),
    }).required().min(1)
}