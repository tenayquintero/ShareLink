"use strict"

const generateError=(message, code)=>{
    const error= new Error(message);
    error.httpStatus=code
    throw error;
}

module.exports = {generateError }
