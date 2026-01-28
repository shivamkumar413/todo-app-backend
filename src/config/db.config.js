import mongoose  from "mongoose";
import { DB_URL } from "./server.config.js";

export async function connectDB(){
    try {
        await mongoose.connect(DB_URL)
        console.log("Successfully connected to mongodb database")
    } catch (error) {
        console.log("Error while connecting to the database : ",error);

    }
}