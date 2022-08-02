"use strict"

const crypto = require("crypto");
const sgMail=require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Generador de errores
const generateError=(message, code)=>{
    const error= new Error(message);
    error.httpStatus=code
    throw error;
}

//validador de shemas
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

//envio de email
const sendEmail = async (msg) => {
    try {
        await sgMail.send(msg)
    } catch (error) {
        generateError("The email could not be sent")    }

}



module.exports = {generateError, validate, generateRandomString,sendEmail }
