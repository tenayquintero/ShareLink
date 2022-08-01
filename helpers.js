"use strict"

const { format } = require("mysql2");
const crypto = require("crypto");

function formatDateToDB(dateObject){
    return format(dateObject, 'yyyy-MM-dd HH:mm:ss');
}
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
function generateRandomString(byteString){
    return crypto.randomBytes(byteString).toString("hex");
}

module.exports = {generateError, validate, generateRandomString, formatDateToDB }
