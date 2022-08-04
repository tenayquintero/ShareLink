"use strict"
const getDB=require('../db/db');
const { generateError } = require('../helpers');

const userExist=async(req,send, next)=>{
    let connection;
  try{
    //Lanzamos la conexión
    connection = await getDB();

    //Extraemos el id del cliente
    const { id } = req.params
 

    //buscamos el id en la base de datos para confirmar existencia.
    const [existUser]= await connection.query(`
    SELECT id_user
    FROM users
    WHERE id_user=?
    `,[id]);
    
    if(existUser.length ===0){
        generateError("User not found",404)
    }

      next();
  }catch(error){
      next(error)
  }finally{
      if(connection) connection.release();
  }
}

module.exports = userExist;