//PRobar que usuario mande por body name y email y que se imprima por console
////require.body 
const {validate, generateRandomString,generateError,sendEmail} = require("../../helpers");
const {registrationSchema} = require("../../schemas");
const getDB = require("../../db/db");




const newUser = async (req,res,next)=>{

    let connection;
    try{
        //connection to db
        connection = await getDB();
        //user validation
        await validate(registrationSchema, req.body);

        const {email, password}= req.body;
        //email exist?
        const [existingUser] = await connection.query(`
        SELECT id_user
        FROM users
        WHERE email=?
        `, [email]);

        if(existingUser.length>0){
          generateError('The email is exists already', 409)
        }

        const registration_code = generateRandomString(40);

        //send validation email to created user
        //pendiente de arreglar process.env.HOST_PUBLIC
        await sendEmail({
            to:email,
            subject:"Share Link verification code",
            body: `Welcome to Share Link. Click on the next link for verification your email: http://127.0.0.1:3000/users/validate/${registration_code}`

        });
        console.log(process.env.HOST_PUBLIC)


        //add user to db
        await connection.query(`
            INSERT INTO users ( email, password, registration_code)
            VALUES(?, SHA2(? , 512), ?)
        `,[ email,password, registration_code]);
        //comentar con Yaneth
        //video martes 26 1:16:48 stefano pone formatDateToDB(new Date(), email, password, registration_code) y lo importa de helpers
    
    res.status(201).send({
        status: "ok",
        message:"usuario creado",
        data:1,
    });
}catch(error){
    next(error);
}finally{
    if(connection) connection.release();
}
};

module.exports = newUser;