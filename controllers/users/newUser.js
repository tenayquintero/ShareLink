"use strict"
const { validate, generateRandomString, generateError,sendEmail } = require("../../helpers");
const { registrationSchema } = require("../../schemas");
const getDB = require("../../db/db");

const fs=require('fs/promises');
const path=require('path');
const Hogan=require('hogan.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const filePath= path.join(__dirname,"..","..","views","emailNewUser.hjs");
console.log(filePath);

const newUser = async (req, res, next) => {
    let connection;
    try {
        //se realiza la conexión
        connection = await getDB();

        //Se valida el forma del email y la password
        await validate(registrationSchema, req.body);

        //Se extrae el email y la password que envia el cliente por el body
        const { email, password } = req.body;

        //Se realiza la búsqueda del email en la bd
        const [existingUser] = await connection.query(`
        SELECT id_user
        FROM users
        WHERE email=?
        `, [email]);

        //Si el email existe se genera un error 409(conflict)
        if (existingUser.length > 0) {
            generateError('The email is exists already', 409)
          
        }

        //Se genera un código de registro
        const registration_code = generateRandomString(40);

        //Se envia el email de verificación al usuario
       const verificationLink = `${process.env.HOST_PUBLIC}/users/validate/${registration_code}` 
        
        //configurar la plantilla del email
        const template = await fs.readFile(filePath, 'utf-8');

        //compilar la plantilla
        const compiledTemplate = Hogan.compile(template)
             
       sendEmail({
            to: email,
            from: process.env.EMAIL_VERIFICATION,
            subject: "Verification code",
            text: "all easy",
           html: compiledTemplate.render({ verificationLink:verificationLink})
           }
        )
       
        //Se añaden los datos en la db
        await connection.query(`
            INSERT INTO users ( email, password, registration_code)
            VALUES(?, SHA2(? , 512), ?)
        `, [email, password, registration_code]);


        res.status(201).send({
            status: "ok",
            message: "Please check your e-mail and click on the code that has been sent",
            data: 1,
        });

    } catch (error) {
        next(error);
         console.log(error)

    } finally {
        //Se suelta la conexión
        if (connection) connection.release();
        
    }
};

module.exports = newUser;