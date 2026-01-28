import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from '../../config/server.config.JS'
import { REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '../../config/server.config'

export async function generateToken({userId,email,userName}){
    const accessToken = jwt.sign(
        {
            userId : userId,
            email : email,
            userName : userName,
        },
        ACCESS_TOKEN_SECRET,
        {expiresIn : ACCESS_TOKEN_EXPIRY}
    )

    const refreshToken = jwt.sign(
        {
            userId : userId,
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn : REFRESH_TOKEN_EXPIRY}
    )

    
    
    return {
        accessToken,
        refreshToken,
    }

}