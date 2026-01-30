import { StatusCodes } from "http-status-codes";
import { siginService, signUpService } from "../services/user.service.js";
import { customErrorRepsponse, customSuccessResponse, internalServerErrorResponse } from "../utils/customResponse/customResponse.js";
import { userRepository } from "../repository/user.repository.js";

export async function signupController(req,res){
    try {
        const response = await signUpService({
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        });

        console.log("Response at user signup controller : ",response);

        return res
            .status(StatusCodes.CREATED)
            .json(customSuccessResponse(response,"User signed up successfully"))
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
        const {accessToken,refreshToken,updatedUser} = await siginService({
            email : req.body.email,
            password : req.body.password
        });

        return res
            .status(StatusCodes.OK)
            .cookie('accessToken',accessToken,{
                httpOnly : true,
                expires : new Date(Date.now() + 24 * 3600000),
                sameSite : 'lax'
            })
            .cookie('refreshToken',refreshToken,{
                httpOnly : true,
                expires : new Date(Date.now() + 10 * 24 * 3600000),
                sameSite : 'Strict'
            })
            .json(customSuccessResponse(updatedUser,"User signed in successfully"));
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

export async function logoutController(req,res){
    try {
        const user = await userRepository.findById(req?.user);

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        user.refreshToken = undefined;
        await user.save()

        return res
            .status(StatusCodes.OK)
            .json({
                message : "Successfully logout user"
        })

    } catch (error) {
        console.log("Error while logging out user : ",error);
        throw error;
    }
}