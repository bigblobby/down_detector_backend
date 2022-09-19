import Joi from 'joi';

export default {
    createMonitor: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string(),
        url: Joi.string().uri().required(),
        description: Joi.string(),
    }).required().min(1),
    updateMonitor: Joi.object().keys({
        name: Joi.string(),
        title: Joi.string(),
        url: Joi.string().uri(),
        description: Joi.string(),
    }).required().min(1)
}