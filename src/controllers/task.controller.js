import { StatusCodes } from "http-status-codes";
import { customErrorRepsponse, customSuccessResponse, internalServerErrorResponse } from "../utils/customResponse/customResponse.js";
import { createTaskService, deleteManyTaskService, deleteTaskServiceById, getAllTaskService, updateTaskService } from "../services/task.service.js";

export const createTaskController = async (req,res)=>{
    try {
        const response = await createTaskService({
            name : req.body.name,
            description : req.body.description,
            userId : req.user
        })

        return res
            .status(StatusCodes.CREATED)
            .json(customSuccessResponse(response,"Task created Successfully"))
    } catch (error) {
        console.log("Error while creating new task at controller : ",error);
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

export const getAllTaskController = async(req,res)=>{
    try {
        const response = await getAllTaskService({
            userId : req.user,
        })

        return res
            .status(StatusCodes.OK)
            .customSuccessResponse(response,"Fetched all tasks successfully");
    } catch (error) {
        console.log("Error while getting all task at controller : ",error);
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

export const updateTaskController = async (req,res)=>{
    try {
        const response = await updateTaskService({
            userId : req.user,
            taskId : req.params.taskId,
            data : req.body
        })

        return res
            .status(StatusCodes.OK)
            .customSuccessResponse(response,"Updated task successfully");
    } catch (error) {
        console.log("Error while updating task at controller : ",error);
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

export const deleteTaskByIdController = async(req,res)=>{
    try {
        const response = await deleteTaskServiceById({
            userId : req.user,
            taskId : req.params.taskId
        })

        return res
            .status(StatusCodes.NO_CONTENT)
            .customSuccessResponse(response,"Deleted task successfully");
    } catch (error) {
        console.log("Error while deleting task at controller : ",error);
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

export const deleteManyTaskController = async(req,res)=>{
    try {
        const response = await deleteManyTaskService({
            userId : req.user,
            taskIds : req.body.tasks
        })

        return res
            .status(StatusCodes.NO_CONTENT)
            .customSuccessResponse(response,"Deleted many task successfully");
    } catch (error) {
        console.log("Error while deleting many task at controller : ",error);
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