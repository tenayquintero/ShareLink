"use strict"
const getDB=require('../db/db')
const { generateError } = require("../helpers");

//const jwt=require('jsonwebtoken');

const thisIsUser=async(req,res,next)=>{
    let connection;
try{
    connection = await getDB();
    const { authorization } = req.headers;

    if (!authorization) {
        generateError('The authorization is missing', 401)
    }
    res.send({
        nstatus: "ok",
        message: "this is user"
    });
    next();


}catch(error){
    next(error);
}finally{
    if(connection) connection.release();
}


}
  
module.exports= thisIsUser;