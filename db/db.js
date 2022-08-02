"use strict"
const mysql= require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, PASSWORD_USER,MYSQL_DATABASE }=process.env;

let pool;

const getDB=async()=>{
if(!pool){
     pool= mysql.createPool({
       connectionLimit:10,
          user:MYSQL_USER,
          host:MYSQL_HOST,
        password:PASSWORD_USER,
          database:MYSQL_DATABASE,
        timezone:"Z"
     });
     return await pool.getConnection();
}
}

 
 module.exports = getDB;