"use strict"
const getDB =require("../../db/db");
 const { validate, generateError} = require("../../helpers");
 const { registrationLink } = require("../../schemas");


const newLink = async (req, res, next) =>{
    let connection;
    try {
       
        connection = await getDB();

       
        const {url, title, description} = req.body;

        //Obligatorio campo url, title,descrition para incremerntar posibilidades de búsqueda
        if(!url){
            generateError("The field 'url' is required",400)
        }
        if(!title){
            generateError("The field 'title' is required", 400);
        }
        if (!description) {
            generateError("The field 'description' is required", 400);
        }
        
        //se valida url - title -description
        await validate(registrationLink, req.body);
        
        //se introduce la información del nuevo lin en la bd
        await connection.query(`
        INSERT INTO links( url, title, description, id_user)
        VALUES(?,?,?,?)
       `,[url,title,description,req.Auth.id]);

         //Extraer información del link creado para enviarlo como respuest-

        const[linkCreated] = await connection.query(`
         SELECT url, title, description
         FROM links
         WHERE id_user=?
         ORDER BY creation_date DESC
         `,[req.Auth.id]);
        
        
        res.status(201).send({
            status:"ok",
            message: "Your link has been created successfully!!!!",
            data:linkCreated
            
        });
        
    } catch (error) {
        next(error);
       
    }finally{
        //se suelta la conexión
        if(connection) connection.release();
    }

};

module.exports = newLink;