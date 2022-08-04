"use strict"

const getDB = require('../../db/db');
const { generateError, savePhoto, sendEmail, generateRandomString } = require('../../helpers');

const editUser = async (req, res, next) => {
    let connection;
    try {
        //Lanzamos la conexión
        connection = await getDB();
        const { id } = req.params;

        //Se genera un error si el id del token no coincide con el de params
        if (Number(id) !== req.Auth.id) {
            generateError("The user is unauthorized", 401)
        }

        const { name, email } = req.body
        // console.log(name,email)

        const photoName = await savePhoto(req.files.perfil);

        await connection.query(`
          UPDATE users SET perfil=?
          WHERE id_user=?
        `, [photoName, id]);

        const [compareEmail] = await connection.query(`
          SELECT email
          FROM users
          WHERE id_user=?
        `, [id]);

        if (compareEmail[0].email !== email) {

            const [existEmail] = await connection.query(`
          SELECT email
          FROM users
          WHERE email=?
        `, [email]);

            if (existEmail.length > 0) {
                generateError("The email is exists already", 409)
            }

            res.send({
                message: "You has updated your email please confirm the validation code in your e-mail"
            });

            const registration_code = generateRandomString(40);
            const host_verification = `${process.env.HOST_PUBLIC}/users/validate/${registration_code}`
            sendEmail({
                to: email,
                from: process.env.EMAIL_VERIFICATION,
                subject: "Change the email",
                text: "hello",
                html:
                    `
               <html>
                <head>
                  </head>
                  <body>
                    <section>
                     <h1>Update email</h1>
                     <p>
                      Hello, you have update your email in Share Link please click on the next link for your confirmation:
                       <a style= "background=blue"; href=${host_verification} class="enlace">Confirm Email Adress</a>
                    </p>
                   </section>
                </body>
              </html>

            `})

            await connection.query(`
           UPDATE users SET name=?,email=?, active=0, registration_code=?
           WHERE id_user=?
           `, [name, email, registration_code, id])
        } else {
            await connection.query(`
            UPDATE users SET name=?
            WHERE id_user=?
            `, [name, id])
        }

        res.send({
            status: "OK",
            message: "The user has been updated"
        });

    } catch (error) {
        next(error);

    } finally {
        if (connection) connection.release();
    }
}

module.exports = editUser;