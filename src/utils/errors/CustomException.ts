export default class CustomException extends Error {
    private statusCode: number;

    constructor(message: string, statusCode = 500, name = 'CustomException') {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}