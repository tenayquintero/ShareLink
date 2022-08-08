"use strict"
const getDB = require('../db/db')
const { generateError } = require("../helpers");

const jwt = require('jsonwebtoken');

const thisIsUser = async (req, res, next) => {
    let connection;
    try {
        //Se realiza la conexión a la base de datos
        connection = await getDB();

        //Se extrae el token de la cabecera
        const { authorization } = req.headers;

        //Si el token no se encuentra en la cabecera este middleware pasa a error 401(Unauthorized)
        if (!authorization) {
            generateError('The authorization is missing', 401)
        }
        //Checkea que el token sea válido(virificar autorizacion y firma)
        let infoToken;
        try {
            infoToken = jwt.verify(authorization, process.env.JWT_SECRET)
        } catch (error) {
            generateError("The token is not valid", 401)
        }

        //Añadimos en la req el tokeInfo 
        req.Auth = infoToken;

//         const [checkDatePassword] = await connection.query(`
   
//    SELECT last_up_ps
//    FROM users
//    WHERE id_user=?
//    `, [req.Auth.id]);
        
//       //Se pasa la fechade la db a formato unix y se compara con la date del token
//         if (checkDatePassword[0].last_up_ps.getTime() > (req.Auth.iat * 1000) ) {
//              generateError("Expired token", 401)
//         }

        next();

    } catch (error) {
        next(error);

    } finally {
        //Se suelta la conexión
        if (connection) connection.release();
    }

}

module.exports = thisIsUser;