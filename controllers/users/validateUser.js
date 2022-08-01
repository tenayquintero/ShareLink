"use strict"
//const getDB=require('../../db/db');

const validateUser=(req,res, next)=>{
    res.send({
        status:"OK",
        message:"User validate succesful"
    })
}

module.exports=validateUser;
