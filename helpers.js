"use strict"

const crypto = require("crypto");
const sgMail=require('@sendgrid/mail');
const sharp=require('sharp');
const fs=require('fs/promises');
const path = require("path");


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

const cryptoPhoto=generateRandomString(40)
const staticDir = path.join(__dirname, process.env.STATIC_FILE);
//guardo fotoPerfil en carpeta static:
const savePhoto=async(dataPhoto)=>{
      await fs.access(staticDir);

      //sharp lee la imágen
     const img= sharp(dataPhoto.data);

     const photoName=(`upload_${cryptoPhoto}_${dataPhoto.name}`);

     await img.toFile(path.join(staticDir,photoName));
     
     return photoName;
}



module.exports = {generateError, validate, generateRandomString,sendEmail,savePhoto }
