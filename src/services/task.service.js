import { StatusCodes } from "http-status-codes";
import { taskRepository } from "../repository/task.repository.js";
import ClientError from "../utils/errors/ClientError.js";
import { userRepository } from "../repository/user.repository.js";
import User from "../schema/user.schema.js";
import Task from "../schema/task.schema.js";

export const createTaskService = async ({name,description,userId})=>{
    try {
        if(!name){
            return new ClientError({
                message : 'Task name is required',
                explanation : 'Name is required',
                statusCode : StatusCodes.BAD_REQUEST,
            })
        }

        const user = await userRepository.findById(userId);

        if(!user){
            return new ClientError({
                message : 'Invalid user',
                explanation : 'Invalid user trying to create new task',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }
        
        const response = await taskRepository.create({name,description,userId});
        await User.findByIdAndUpdate(userId,{
            $push : {
                tasks : response?._id
            }
        })
        return response;
    } catch (error) {
        console.log("Error while creating new task : ",error);
        throw error;
    }
}   

export const getAllTaskService = async({userId})=>{
    try {
        const user = await userRepository.findById(userId);

        if(!user){
            return new ClientError({
                message : 'Invalid user',
                explanation : 'Invalid user trying to fetch tasks',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }

        const tasks = await taskRepository.getAllTask(userId);
        return tasks;
    } catch (error) {
        console.log("Error while getting all task of a user : ",error);
        throw error;
    }
    
}

export const updateTaskService = async ({userId,taskId,data})=>{

    try {
        const user = await userRepository.findById(userId);

        if(!user){
            return new ClientError({
                message : 'Invalid user',
                explanation : 'Invalid user trying to update task',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }

        const task = await Task.findById(taskId);

        if(!task){
            return new ClientError({
                message : 'Invalid task',
                explanation : "User trying to update task that doesn't exist",
                statusCode : StatusCodes.FORBIDDEN
            })
        }
        
        const response = await taskRepository.update(taskId,data);

        return response;
    } catch (error) {
        console.log("Error while updating task : ",error);
        throw error;
    }
    
}


export const deleteTaskServiceById = async({userId,taskId})=>{
    try {
        const user = await userRepository.findById(userId);

        if(!user){
            return new ClientError({
                message : 'Invalid user',
                explanation : 'Invalid user trying to delete task',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }

        const task = await Task.findById(taskId);

        if(!task){
            return new ClientError({
                message : 'Invalid task',
                explanation : "User trying to update task that doesn't exist",
                statusCode : StatusCodes.FORBIDDEN
            })
        }

        const response = await taskRepository.delete(taskId);
        return response;
    } catch (error) {
        console.log('Error while deleting task : ',error);
        throw error;
    }
}

export const deleteManyTaskService = async(userId,taskIds)=>{
    try {
        const user = await userRepository.findById(userId);

        if(!user){
            return new ClientError({
                message : 'Invalid user',
                explanation : 'Invalid user trying to delete task',
                statusCode : StatusCodes.UNAUTHORIZED,
            })
        }

        if(taskIds.length == 0){
            throw new ClientError({
                message : 'No task provided to delete',
                explanation : 'Select some task to delete',
                statusCode : StatusCodes.BAD_REQUEST,
            })
        }

        const response = await taskRepository.deleteMany(taskIds);
        return response;
    } catch (error) {
        console.log("Error while deleting many tasks : ",error);
        throw error;
    }
}