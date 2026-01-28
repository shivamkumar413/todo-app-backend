import { StatusCodes } from "http-status-codes";

class ValidationError extends Error{
    constructor(error){
        super(error);
        this.name = 'VlidationError',
        this.message = error.message,
        this.explanation = error.explanation,
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default ValidationError;