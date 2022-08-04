"use strict"

const getDB = require('../../db/db');

const getLink = async (req, res, next)=>{
    let connection;
    try {
        //se abre conexión
        connection=await getDB();

        //Comprobar :id
        const{id} = req.params;
        const [link] = await connection.query(`
        SELECT url,title,description
        FROM links
        WHERE id_link =?
        `,[id]);
        res.send({
            status:"ok",
            message: "Link",
            data: link
        })
        
    } catch (error) {
        next(error);
        throw error
        
    }finally{
        //solatamos conexión
      if(connection)connection.release();
      
    }
}

module.exports = getLink;