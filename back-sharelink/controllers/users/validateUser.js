"use strict"

const getDB = require("../../db/db");
const { generateError } = require("../../helpers");

const validateUser = async (req, res, next) => {

    let connection;

    //Extraemos el código de registro del body
    const { registration_code } = req.body;

    try {
        //Realizamos la conexión
        connection = await getDB();

        //Comparación de código de verificación en base de datos
        const [compareRC] = await connection.query(`
            SELECT id_user 
            FROM users
            WHERE registration_code = ?
            
           `, [registration_code])

        //Inexistencia de usuarios con ese código de verificación, error 404 (Not found) 
        if (compareRC.length === 0) {
            generateError("Registration code not valid", 404)
        }

        //activación de usuario y anulación de código de verificación
        await connection.query(`
            UPDATE users SET active=true, registration_code=null
            WHERE registration_code=? 
        `, [registration_code]);

        res.send({
            status: "OK",
            message: "User validated successfully!!!"

        })

    } catch (error) {
        next(error)

    } finally {
        //Se suelta la conexión 
        if (connection) connection.release();


    }

}

module.exports = validateUser;
