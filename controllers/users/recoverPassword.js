const { generateError, sendEmail, generateRandomString } = require('../../helpers');

const getDB=require('../../db/db');

const Hogan=require('hogan.js');
const fs = require('fs/promises');
const path= require('path');

const filePath= path.join(__dirname,"..","..","views","emailRecoverPssword.hjs");

const recoverPassword=async(req,res,next)=>{
    let connection;
    try{
        connection=await getDB();
        const { email } = req.body;

        if(!email){
            generateError("The email is requeride", 400)
        }

        const [emailExists]= await connection.query(`
        SELECT email,name
        FROM users
        WHERE email=?
        `,[email]);

        if(emailExists.length === 0){
            generateError("The email is not exist",404);
        }
        //Aprovechar la query emailExist para obtener el nombre del usuario.
        const name= emailExists[0].name

        const template= await  fs.readFile(filePath, "utf-8");
        const compiledTemplate= Hogan.compile(template);

        const recover_code=generateRandomString(40);
        sendEmail({
            to:email,
            from: process.env.EMAIL_VERIFICATION,
            subject:"Recover password",
            text:"text",
            html:compiledTemplate.render({
                name:name,
                recover_code:recover_code
            })
               
        });

        await connection.query(`
        UPDATE users
        SET recover_code=?
        WHERE email=?
        `,[recover_code,email])

        res.send({
            status: "Ok",
            message: "An email verification message has been sent, please check your e-mail"
        })

    }catch(error){
        next(error);
    }finally{
        if(connection) connection.release();
    }

   
};

module.exports=recoverPassword;