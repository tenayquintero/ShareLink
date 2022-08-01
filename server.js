"use strict"
require('dotenv').config();
const express=require('express');
const morgan = require('morgan');

const {newUser, validateUser} = require('./controllers/users');

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
