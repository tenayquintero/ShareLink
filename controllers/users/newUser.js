//PRobar que usuario mande por body name y email y que se imprima por console
////require.body 
const {validate, formatDateToDB, generateRandomString} = require("../../helpers");
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
        SELECT id_users
        FROM users
        WHERE email=?
        `, [email])
        if(existingUser.length>0){
            const error = new Error("Ya existe un usuario con este email");
            error.httpStatus = 409;
            throw error;
        }

        const registration_code=generateRandomString(40);

        //send validation email to created user

        //add user to db
        await connection.query(`
            INSERT INTO users (date, email, password, registation_code)
            VALUES(?, ?, SHA2(?,512), registation_code)
        `,[formatDateToDB(new Date()), email,password, registration_code])
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