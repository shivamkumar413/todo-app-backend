export const customErrorRepsponse = (error)=>{

    if(!error.message && !error.explanation){
        return internalServerErrorResponse(error);
    }

    return{
        success : false,
        message : error.message,
        explanation : error.explanation,
        data : null
    }
}

export const internalServerErrorResponse = (error)=>{
    return {
        success : false,
        message : `Internal server error`,
        error : error,
        data : null,
    }
}

export const customSuccessResponse = (data,message)=>{
    return {
        success : true,
        message,
        data
    }
}