"use strict"
const getDB =require("../../db/db");
 const { validate} = require("../../helpers");
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

        // if(!description){
        //     generateError("description is require", 400)
        // }
       
        console.log("Estoy en newLink",req.Auth)
        console.log(">>>>", url, title, description)
        
        //se realiza la busqueda de url - title -description en la bd
        await connection.query(`
        INSERT INTO links( url, title, description, id_user)
        VALUES(?,?,?,?)
       `,[url,title,description,req.Auth.id]);
        
        
        res.send({
            status:"ok",
            message: "Your link has been successful!!!!",
            
        });
        
    } catch (error) {
        next(error);
        console.log(error)
    }finally{
        //se suelta la conexión
        if(connection) connection.release();
    }

};

module.exports = newLink;