import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { SALT } from "../config/server.config.js";

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
        },
        role : {
            type : String,
            enum : ["user","admin"],
            default : "user"
        },
        tasks : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Task"
            }
        ]
    },
    {
        timestamps : true
    }
)

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,5);
    
})

const User = mongoose.model('User',userSchema);

export default User;