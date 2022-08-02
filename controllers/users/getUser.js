"use stric"
 const getUser=(req, res, next)=>{
    res.send({
        status:"ok",
        message:"User",
        data:[]
    })

 }
 module.exports=getUser;