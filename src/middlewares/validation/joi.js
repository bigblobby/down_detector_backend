export default (schema, property = 'body') => {
    return async (req, res, next) => {
        const { error } = await schema.validate(req[property]);

        if (!error) {
            next();
        } else {
            const message = error.details.map(detail => detail.message).join(',');
            res.status(422).json({ error: message });
        }
    }
}