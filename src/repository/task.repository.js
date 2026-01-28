import Task from "../schema/task.schema.js"
import User from "../schema/user.schema.js";

export const taskRepository = {

    getAllTask : async (userId)=>{
        const tasks = await User.findById(userId).populate('tasks')
        return tasks;
    },
    create : async (data)=>{
        const task = await Task.create(data);
        return task;
    },
    update : async (taskId,data)=>{
        const updatedTask = await Task.findByIdAndUpdate(taskId,data,
            {new : true}
        )
        return updatedTask;
    },
    delete : async (taskId)=>{
        const response = await Task.deleteOne({_id : taskId})
        return response;
    },
    deleteMany : async(data)=>{
        const response = await Task.deleteMany({
            _id : { $in : data}
        })

        return response;
    }
}