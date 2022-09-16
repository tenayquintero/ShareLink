"use strict"
const getDB=require('../db/db');
const { generateError } = require('../helpers');

const linkExists=async(req,res,next)=>{
let connection;
 try{  
    connection = await getDB();

    const{id}=req.params;

    const [linkExists]= await connection.query(`
    
    SELECT id_link
    FROM links
    WHERE id_link=?
    `,[id])

    if(linkExists.length===0){
        generateError("The link is not exist", 404)
    }

     next();

 }catch(error){
    next(error)
 }finally{
    if(connection) connection.release();
 }

}

module.exports=linkExists;