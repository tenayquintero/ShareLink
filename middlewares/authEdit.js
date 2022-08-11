"use stric"

const getDB = require("../db/db");
const { generateError } = require("../helpers");

const authEdit=async(req,res,next)=>{
    let connection;
    try{
        connection= await getDB();
        const{id} = req.params;
        console.log("soy id:",id)

        const [result] = await connection.query(`
        
        SELECT id_user
        FROM links
        WHERE id_link=?
        `,[id]);

        if (result[0].id_user !== req.Auth.id && req.Auth.role!=="admin"){
            generateError("The user is unauthorizade")
        }

        next()
    }catch(error){
     next(error);
    }finally{
    if(connection) connection.release();
    }

};

module.exports=authEdit;