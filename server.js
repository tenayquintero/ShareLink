"use strict"
require('dotenv').config();
const express=require('express');
const morgan = require('morgan');


//Importaciones Locales
const { PORT } = process.env;
const {newUser, validateUser, userLogin, getUser} = require('./controllers/users');
const thisIsUser = require('./middlewares/thisIsUser');
const {newLink, listLink, getLink} = require('./controllers/links');

const app= express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());

/**
 * USERS
*/

//POST - '/users' - Creación de usuario sin activar - obligatorio email y password.
app.post('/users', newUser);

//- GET - '/users/validate/:registration_code' - Validaremos al usuario que se ha registrado.
app.get('/users/validate/:registration_code',validateUser);

//POST - '/users/login' - Comprobar que el usuario existe -mail y password obligatoria - Devolverá el token.
app.post('/users/login', userLogin);

//GET - '/users/:id' -Devolvemos información del usuario teniendo en cuenta si es el propio usuario o admin se le dará más información y si no lo es se le dará menos información. - Token obligatorio.
app.get('/users/:id',thisIsUser,getUser);

/**
 * LINKS
 */
 //GET - '/links' - Ver enlaces publicados por orden de publicación de más actual a anterior.
app.get('/links', listLink);
//GET - '/links/:id' - Ver información de una publicación específica.
app.get('links/:id', getLink);

// POST - '/links/:id' - Compartir un enlace -URL -Título -Descrpción --Token obligatorio.
app.post('/links/:id', newLink);



//middleware Not Found-404
app.use((req,res)=>{
   res.status(404).send({
    status:'Error',
    message:'Not Found'
   })
});

//middleware httpStatus
app.use((error,req,res,next)=>{
     res.status(error.httpStaus || 500).send({
        status:'Error',
        message: error.message
     })
})


app.listen(PORT,()=>{
    console.log("Heyyyy I'm here")
});
