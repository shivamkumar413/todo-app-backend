import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { SALT } from "../config/server.config";

const userSchema = new mongoose.Schema(
    {
        avatar : {
            type : String,
            default : 'https://placehold.co/300x300'
        },
        email : {
            type : String,
            required : [true,'email is required'],
            unique : [true,'email should be unique'],
            lowercase : true,
        },
        username : {
            type : String,
            required : [true,'username is required'],
            unique : [true,'username should be unique'],
            lowercase : true,
        },
        fullName : {
            type : String,
        },
        password : {
            type : String,
            required : true
        },
        refreshToken : {
            type : String,
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,SALT);
    next()
})



const User = mongoose.model('User',userSchema);

export default User;