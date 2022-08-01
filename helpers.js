"use strict"

const sgMail=require('@sendgrid/mail');
const crypto = require("crypto");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



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

const sendEmail=async({to,subject,body})=>{
      try{
          const msg = {
              to,
              from: process.env.EMAIL_VERIFICATION,
              subject,
              text: body,
              html:
                  `
         <section>
            <h1>${subject}</h1>
            <p>${body}</p>
        </section>
          
        `
          }
        await sgMail.send(msg)

      }catch(error){
           generateError('Error sending the email');
      }
       
      }



module.exports = {generateError, validate, generateRandomString,sendEmail }
