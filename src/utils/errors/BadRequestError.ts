export default class BadRequestError extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}