import Joi from "joi";

export default {
    register: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required().min(1),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required().min(1)
}