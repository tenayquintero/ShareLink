"use strict"
const getDB = require("../../db/db");


const listLink = async (req,res,next)=>{
    let connection;
    try {
        //se abre conexion
        connection=await getDB();

        const [link]= await connection.query(`
        SELECT id_link, url, title, description
        FROM links
        WHERE id_link=?, url=?, title=?, description=?
        `)

        res.send({
            status:"ok",
            message: "Listado Link",
            data:link,
        })
        
    } catch (error) {
        next(error);
        throw error
    }finally{
        //soltamos la conexión
        if(connection)connection.release();
        process.exit(0);
    }
   
}

module.exports = listLink;