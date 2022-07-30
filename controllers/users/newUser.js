//PRobar que usuario mande por body name y email y que se imprima por console
////require.body 

const newUser = (req,res,next)=>{
    //crear el usuario en la base de datos
    res.status(201).send({
        status: "ok",
        message:"usuario creado",
        data:1,
    });
};

module.exports = newUser;