"use strict"
require('dotenv').config();
const express=require('express');
const morgan = require('morgan');

const {newUser, validateUser, userLogin, getUser} = require('./controllers/users');
const thisIsUser = require('./middlewares/thisIsUser');

const app= express();

//Importaciones Locales
const{PORT}=process.env;

//middleware
app.use(morgan('dev'));
app.use(express.json());

//POST - '/users' - Creación de usuario sin activar - obligatorio email y password.
app.post('/users', newUser);

//- GET - '/users/validate/:registration_code' - Validaremos al usuario que se ha registrado.
app.get('/users/validate/:registration_code',validateUser);

//POST - '/users/login' - Comprobar que el usuario existe -mail y password obligatoria - Devolverá el token.
app.post('/users/login', userLogin);

app.get('/users/:id',thisIsUser,getUser);

//middleware Not Found-404
app.use((req,res)=>{
   res.status(404).send({
    status:'Error',
    message:'Not Found'
   })
});

app.use((error,req,res,next)=>{
     res.status(error.httpStaus || 500).send({
        status:'Error',
        message: error.message
     })
})


app.listen(PORT,()=>{
    console.log("Heyyyy I'm here")
});
