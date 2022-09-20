import Joi from 'joi';

export default {
    check: Joi.object().keys({
        url: Joi.string().uri(),
        getScreenshot: Joi.boolean(),
        getHeaders: Joi.boolean(),
    }).required().min(1)
}