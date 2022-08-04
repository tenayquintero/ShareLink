"use strict"
const getDB = require("../../db/db");


const listLink = async (req,res,next)=>{
    let connection;
    try {
        //se abre conexion
        connection=await getDB();
        
        //ver todas los enlaces solo mostrar url,title
        const [link]= await connection.query(`
        SELECT url, title, description
        FROM links
        
        `)

        res.send({
            status:"ok",
            message: "Listado Link",
            data:link,
        })
        
    } catch (error) {
        next(error);
        
    }finally{
        //soltamos la conexión
        if(connection)connection.release();
       
    }
   
}

module.exports = listLink;