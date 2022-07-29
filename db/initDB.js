"use strict"
require('dotenv').config;

const getDB=require('./db')

const main = async()=>{
    let connection;
try{
 connection = await getDB();

}catch(error){

throw new error('Conection not possible')

}finally{
 if(connection) connection.release();
 process.exit();
}
}
main();