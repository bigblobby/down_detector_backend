import Joi from 'joi';

export default {
    createPing: Joi.object().keys({
        status: Joi.string().required(),
        statusCode: Joi.number().required(),
        url: Joi.string().uri().required(),
        monitorId: Joi.number().required(),
    }).required().min(1),
    check: Joi.object().keys({
        url: Joi.string().uri().required(),
        getScreenshot: Joi.boolean(),
        getHeaders: Joi.boolean(),
    }).required().min(1)
}