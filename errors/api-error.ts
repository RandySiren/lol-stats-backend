import { StatusCodes } from 'http-status-codes';

export default class ApiError extends Error {
    name: string;
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = StatusCodes.BAD_REQUEST;
        Error.captureStackTrace(this, this.constructor);
    }

    public serialize() {
        return { name: this.name, details: this.message };
    }
}
