export default class ForbiddenException extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "ForbiddenException";
        this.statusCode = 403;
    }
}