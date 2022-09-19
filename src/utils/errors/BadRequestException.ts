export default class BadRequestException extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "BadRequestException";
        this.statusCode = 400;
    }
}