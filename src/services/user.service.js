import { userRepository } from "../repository/user.repository.js";
import User from "../schema/user.schema.js";
import bcrypt from 'bcrypt'
import ClientError from './../utils/errors/ClientError.js'
import ValidationError from './../utils/errors/ValidationError.js'
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../utils/authUtils/generateToken.js";

export const signUpService = async({email,username,password})=>{

    try {
        const user = await userRepository.create({email,username,password});
        console.log("user at signup service : ",user);
        return user;
    } catch (error) {
        console.log("Error while creating user : ",error);
        if (error.name === 'MongooseError' || error.code === 11000) {
            throw new ValidationError({
                message : 'A user with same name or email already exists',
                explanation : 'Try using different email or username'
            });
        }
        throw error;
    }

}

export const siginService = async({email,password})=>{
    try {
        const user = await User.findOne({email : email});
        console.log("user at sign in service : ",user)
        if(!user){
            return new ClientError({
                message : 'User not found',
                explanation : 'Try to create account , then login',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }

        const isPasswordMatch = bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return new ClientError({
                message : "password don't match",
                explanation : "Try again with different password",
                statusCode : StatusCodes.BAD_REQUEST,
            })
        }

        const {accessToken,refreshToken} = generateToken(
            {
                userId : user?._id,
                userName : user?.username,
                email : user?.email
            }
        )

        console.log("access token : ",accessToken);
        console.log("refresh token : ",refreshToken);

        user.refreshToken = refreshToken;
        await user.save();
        return{
            accessToken : accessToken,
            refreshToken : refreshToken,
            user,
        }
    } catch (error) {
        console.log("Error while signing in user : ",error);
        throw error;
    }
}