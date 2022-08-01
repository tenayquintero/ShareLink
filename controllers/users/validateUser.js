"use strict"

const getDB = require("../../db/db");
const { generateError } = require("../../helpers");



const validateUser=async (req,res, next)=>{

let connection;
const {registration_code}=req.params;

    try {
        connection = await getDB();
        const [compareRC] =await connection.query(`
            SELECT id_user 
            FROM users
            WHERE registration_code =?

        `,[registration_code])
        if(!compareRC){
            generateError("Registration code not valid", 404)
        }
        await connection.query(`
            UPDATE users SET active=true, registration_code=null
            WHERE registration_code=? 
        ` [registration_code])
    
} catch (error) {
    next(error)
    
}finally{ 
    if (connection) connection.release();
    process.exit;   

}
  
}

module.exports=validateUser;
