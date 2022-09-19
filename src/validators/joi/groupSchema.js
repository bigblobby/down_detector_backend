import Joi from 'joi';

export default {
    createGroup: Joi.object().keys({
        name: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
    }).required().min(1),
    updateGroup: Joi.object().keys({
        name: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
    }).required().min(1)
}