export default (schema, property = 'body') => {
    return async (req, res, next) => {
        const {error, value} = await schema.validate(req[property]);

        req[property] = value;

        if (!error) {
            next();
        } else {
            const message = error.details.map(detail => detail.message).join(',');
            res.status(422).json({ error: message });
        }
    }
}