"use strict"

const getDB = require('../../db/db');

const getLink = async (req, res, next)=>{
    let connection;
    try {
        //se abre conexión
        connection=await getDB();

        //Comprobar :id
        //const{id} = req.params;
        const [link] = await connection.query(`
        SELECT id_link
        FROM links
        WHERE id_link =?
        `);
        res.send({
            status:"ok",
            message: "link",
            data: link
        })
        
    } catch (error) {
        next(error);
        throw error
        
    }finally{
        //solatamos conexión
        if(connection)connection.release();
        process.exit(0);
    }
}

module.exports = getLink;