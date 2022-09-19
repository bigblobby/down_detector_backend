export default class InternalServerErrorException extends Error {
    private statusCode: number;

    constructor(message) {
        super(message);
        this.name = "InternalServerErrorException";
        this.statusCode = 500;
    }
}