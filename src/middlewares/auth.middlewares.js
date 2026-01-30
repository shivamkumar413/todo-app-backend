import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/server.config.js';
import { userRepository } from '../repository/user.repository.js';
import { StatusCodes } from 'http-status-codes';
import { customErrorRepsponse, internalServerErrorResponse } from '../utils/customResponse/customResponse.js';

export async function isAuthenticated(req,res,next){
    try {
        const accessToken = req.cookies.accessToken;

        
        // console.log("At is authenticated ");
        // console.log(accessToken)
        // console.log("request : ",req)
        // console.log("all cookies : ",req.cookies)
        if(!accessToken){
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorRepsponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'No auth token provided'
                })
            );
        }

        const response = jwt.verify(accessToken,ACCESS_TOKEN_SECRET);

        if(!response){
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorRepsponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token sent from the client'
                })
            );
        }

        const user = await userRepository.findById(response.userId)

        req.user = user?.id;
        next();
        

    } catch (error) {
        console.log('Auth middleware error : ', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorRepsponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token sent from the client'
                })
            );
        }

        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerErrorResponse(error));
    }
}