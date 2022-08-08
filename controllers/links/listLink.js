"use strict"
const getDB = require("../../db/db");


const listLink = async (req,res,next)=>{
    let connection;
    try {
        //se abre conexion
        connection=await getDB();
        
        //ver todas los enlaces solo mostrar url,title
        const [link]= await connection.query(`
        SELECT url, title
        FROM links
        
        `);
        // const{search}=req.query;
        // console.log(search);
        // if(search){
        //   const[result]=  await connection.query(`
        //     SELECT url,title
        //     FROM links
        //     WHERE url like? or title like or description like ?
             
        //     `, [`%${search}%`, `%${search}%`, `%${search}%`])
        // }

        res.send({
            status:"ok",
            message: "List Link",
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