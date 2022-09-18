import Joi from "joi";

export default (schema, property = "body") => {
    return async (req, res, next) => {
        const { error } = await schema.validate(req[property]);
        console.log(error);

        if (!error) {
            next();
        } else {
            const message = error.details.map(i => i.message).join(',')
            res.status(422).json({ error: message })
        }
    }
}