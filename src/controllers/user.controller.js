import { StatusCodes } from "http-status-codes";
import { siginService, signUpService } from "../services/user.service.js";
import { customErrorRepsponse, customSuccessResponse, internalServerErrorResponse } from "../utils/customResponse/customResponse.js";

export async function signupController(req,res){
    try {
        const response = await signUpService();

        return res
            .status(StatusCodes.CREATED)
            .json(customSuccessResponse(response,"User signed in successfully"))
    } catch (error) {
        console.log("Error while signing up new user : ",error)
        if(error.statusCode){
            return res
                .status(error.statusCode)
                .json(customErrorRepsponse(error))
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerErrorResponse(error))
    }
}

export async function signInController(req,res){
    try {
        const {accessToken,refreshToken,user} = await siginService({
            email : req.body.email,
            password : req.body.password
        });

        return res
            .status(StatusCodes.OK)
            .cookie('accessToken',accessToken,{
                httpOnly : true,
                expires : new Date(Date.now() + 24 * 3600000),
                sameSite : 'Strict'
            })
            .cookie('refreshToken',refreshToken,{
                httpOnly : true,
                expires : new Date(Date.now() + 10 * 24 * 3600000),
                sameSite : 'Strict'
            })
            .json(customSuccessResponse(user,"User signed in successfully"));
    } catch (error) {
        console.log("Error while signing in user controller : ",error);
        if(error.statusCode){
            return res
                .status(error.statusCode)
                .json(customErrorRepsponse(error))
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerErrorResponse(error))
    }
}