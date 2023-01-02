import {DEBUG_MODE} from '../config';
import {ValidationError} from 'joi';
import CustomErrorHandler from '../services/customErrorHandler';

// All the error in our application is catched here in (err)
const errorHandler = (err,req,res,next) => {
    // Sending the status code and message to display the user frontEnd
    let statusCode = 500;
    let data = {
        message : 'Internal server error',
        // It will show our server error details. so, we try to not display this error on our production
        ...(DEBUG_MODE === 'true' && {originalError: err.message}) 
    }

    if(err instanceof ValidationError){
        statusCode =  422;
        data = {
            message: err.message
        }
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.status;
        data = {
            msg : err.message
        }

    }
    return res.status(statusCode).json(data);

}


export default errorHandler;