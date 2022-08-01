"use strict"
const mysql= require('mysql2/promise');

const { HOST,USER,PASSWORD_USER,DATABASE }=process.env;

let pool;

const getDB=async()=>{
if(!pool){
     pool= mysql.createPool({
       connectionLimit:10,
        user:USER,
        host:HOST,
        password:PASSWORD_USER,
        database:DATABASE,
        timezone:"Z"
     });
     return await pool.getConnection();
}
}

 
 module.exports = getDB;