"use sstrict"
const getDB=require('../../db/db');
const{generateError, validate}=require('../../helpers');
const { registrationLink } = require('../../schemas');

const editLink=async(req,res,next)=>{
let connection;
  try{
    connection = await getDB()

      const { url, title, description } = req.body;
      const {id}=req.params;

      if (!url) {
          generateError("The field 'url' is required", 400)
      }
      if (!title) {
          generateError("The field 'title' is required", 400);
      }
      if (!description) {
          generateError("The field 'description' is required", 400);
      }

      await validate(registrationLink,req.body);

      await connection.query(`
      UPDATE links
      SET url=?,title=?,description=?
      WHERE id_link=?
      `,[url,title,description,id])

      res.send({
          status: "OK",
          message: "The link has been modificated succesful!!!"

      })

  }catch(error){
    next(error);
  }finally{
    if(connection) connection.release();
  }
}

module.exports=editLink;