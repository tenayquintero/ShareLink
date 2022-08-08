const { generateError, sendEmail, generateRandomString } = require('../../helpers');

const getDB=require('../../db/db');

const recoverPassword=async(req,res,next)=>{
    let connection;
    try{
        connection=await getDB();
        const { email } = req.body;

        if(!email){
            generateError("The email is requeride", 400)
        }

        const [emailExists]= await connection.query(`
        SELECT email
        FROM users
        WHERE email=?
        `,[email]);

        if(emailExists.length === 0){
            generateError("The email is not exist",404);
        }
        const recover_code=generateRandomString(40);
        sendEmail({
            to:email,
            from: process.env.EMAIL_VERIFICATION,
            subject:"Recover password",
            text:"text",
            html:
                `
           <html>
            <head>
              </head>
              <body>
                <section>
                 <h1>verification email</h1>
                 <p>
                   Welcome to Share Link. You have requested a password recovery if it was you please
                   confirm the following code :
                   ${recover_code} 
                </p>
               </section>
            </body>
          </html>

        `
        });

        await connection.query(`
        UPDATE users
        SET recover_code=?
        WHERE email=?
        `,[recover_code,email])



        res.send({
            status: "Ok",
            message: "Has been send a email verefication message, please check your e-mail"
        })

    }catch(error){
        next(error);
    }finally{
        if(connection) connection.release();
    }

   
};

module.exports=recoverPassword;