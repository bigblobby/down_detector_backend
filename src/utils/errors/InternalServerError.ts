export default class InternalServerError extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = 500;
    }
}