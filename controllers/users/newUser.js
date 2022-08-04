"use strict"
const { validate, generateRandomString, generateError,sendEmail } = require("../../helpers");
const { registrationSchema } = require("../../schemas");
const getDB = require("../../db/db");


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        
             
       sendEmail({
            to: email,
            from: process.env.EMAIL_VERIFICATION,
            subject: "Verification code",
            text: "all easy",
            html:
                `
           <html>
            <head>
              </head>
              <body>
                <section>
                 <h1>verification email</h1>
                 <p>
                   Welcome to Share Link.Click on the next link for verification your email:
                   <a style= "background=blue"; href=${verificationLink} class="enlace">Confirm Email Adress</a>
                </p>
               </section>
            </body>
          </html>

        `}
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