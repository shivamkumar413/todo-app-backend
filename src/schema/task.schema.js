import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            requird : [true,'Task name is required']
        },
        description : {
            type : String,
        },
        status : {
            type : String,
            enum : ['Done','Going','Not Done'],
            default : 'Not Done'
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {timestamps : true}
)

const Task = mongoose.model("Task",taskSchema);

export default Task;