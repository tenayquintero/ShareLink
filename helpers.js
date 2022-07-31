"use strict"

const generateError=(message, code)=>{
    const error= new Error(message);
    error.httpStatus=code
    throw error;
}

async function validate(schema, data ){
    try {
        await schema.validateAsync(data)
    } catch (error) {
        error.httpStatus = 400
        throw error
    }
} 

module.exports = {generateError, validate }
