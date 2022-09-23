export default class UnauthorizedException extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = 401;
    }
}