"use strict"
const getDB =require("../../db/db");
const { validate, generateError } = require("../../helpers");
const { registrationLink } = require("../../schemas");


const newLink = async (req, res, next) =>{
    let connection;
    try {
        //se realiza la conexión
        connection = await getDB();

        //se valida url - title -description
        await validate(registrationLink, req.body);

        //se extrae url - title - description
        const {url, title, description} = req.body;

        //se realiza la busqueda de url - title -description en la bd
        const [existingLink]= await connection.query(`
        SELECT url, title, description
        FROM links
        WHERE url=? , title=?, description=?
        `,[url,title,description]);

        //si el link no existe se genera un error 404(Not found)
        if(existingLink.length ==0){
            generateError('The link not exist',404)
        }
        res.status().send({
            status:"ok",
            message: "link compartido",
            data: existingLink
        });
        
    } catch (error) {
        next(error);
    }finally{
        //se suelta la conexión
        if(connection) connection.release();
    }

};

module.exports = newLink;