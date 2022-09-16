"use strict"
const getDB = require('../db/db')
const { generateError } = require("../helpers");

const jwt = require('jsonwebtoken');

const thisIsUser = async (req, res, next) => {
    let connection;
    try {

        connection = await getDB();

        const { authorization } = req.headers;

        //Si el token no se encuentra en la cabecera este middleware pasa a error 401(Unauthorized)
        if (!authorization) {
            generateError('The authorization is missing', 401)
        }

        //Checkea que el token sea válido(virificar autorización y firma)
        let infoToken;
        try {
            infoToken = jwt.verify(authorization, process.env.JWT_SECRET)
        } catch (error) {
            generateError("The token is not valid", 401)
        }

        const [checkDatePassword] = await connection.query(`
   
          SELECT last_up_ps
          FROM users
          WHERE id_user=?
          `, [infoToken.id]);

        const last_up_ps = new Date(checkDatePassword[0].last_up_ps)
        const dateToken = new Date(infoToken.iat * 1000)

        if (dateToken < last_up_ps) {
            generateError("Expired token", 401)
        }

        //Añadimos en la req el tokeInfo 
        req.Auth = infoToken;

        next();

    } catch (error) {
        next(error);

    } finally {
        //Se suelta la conexión
        if (connection) connection.release();
    }

}

module.exports = thisIsUser;