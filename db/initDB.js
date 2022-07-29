"use strict"
require('dotenv').config();

const getDB=require('./db')
let connection;

//const main = async()=>{
    async function main() {   
try{
    console.log(process.env.USER);
    console.log(process.env.PASSWORD_USER);
 connection = await getDB();

 await connection.query(`
    CREATE TABLE users(
        id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        date DATETIME NOT NULL,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(150) NOT NULL,
        perfil VARCHAR(150),
        role ENUM("admin", "normal"),
        active BOOLEAN DEFAULT false,
        registation_code VARCHAR(150),
        last_up_ps DATETIME,
        deleted BOOLEAN DEFAULT false
        )
 `);

}catch(error){
    console.error(error.message);

throw new error('Conection not possible')

}finally{
 if(connection) connection.release();
 process.exit();
}
}
main();