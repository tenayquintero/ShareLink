"use strict"
require('dotenv').config();
const express=require('express');
const morgan = require('morgan');
const fileupload=require('express-fileupload')


//Importaciones Locales
const { PORT } = process.env;
const {
   newUser, 
   validateUser, 
   userLogin, 
   getUser, 
   editUser, 
   newPsw,
   recoverPassword,
   recoverNewPassword
} = require('./controllers/users');
const thisIsUser = require('./middlewares/thisIsUser');
const {newLink, listLink, getLink, deleteLink, voteLink, editLink, editVote, deleteVote} = require('./controllers/links');

//middelwares locales
const userExist = require('./middlewares/userExist');
const linkExists = require('./middlewares/linkExist');
const authEdit = require('./middlewares/authEdit');
const voteExist= require('./middlewares/voteExist');
const authEditVote = require('./middlewares/authEditVote');

const app= express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(fileupload());

/**
 * USERS
*/

//POST - '/users' - Creación de usuario sin activar - obligatorio email y password.
app.post('/users', newUser);

//- GET - '/users/validate/:registration_code' - Validaremos al usuario que se ha registrado.
app.get('/users/validate/:registration_code',validateUser);

//POST - '/users/login' - Comprobar que el usuario existe -mail y password obligatoria - Devolverá el token.
app.post('/users/login', userLogin);

//- GET - '/users/:id'
app.get('/users/:id',userExist ,thisIsUser,getUser);

//- PUT - '/users/:id' -- Editar perfil del usuario(Nombre, Email, Biografía, Foto, …) Token obligatorio
app.put('/users/:id',userExist,thisIsUser,editUser);

// PUT - '/users/:id/password' - Que el usuario pueda editar su contraseña --Token obligatorio.
app.put('/users/:id/password',thisIsUser,newPsw)

// POST - '/users/recoverPassword' - Que el usuario pueda recuperar su contraseña --Token obligatorio.
app.post('/users/recover_password',recoverPassword);

// POST - '/users/recoverPassword' - Que el usuario pueda editar su contraseña --Token obligatorio.
app.post('/users/reset_password',recoverNewPassword);



/**
 * LINKS
 */
 //GET - '/links' - Ver enlaces publicados por orden de publicación de más actual a anterior.
 app.get('/links' ,listLink);

 //GET - '/links/:id' - Ver información de una publicación específica.
 app.get('/links/:id', linkExists, getLink);
 
 // POST - '/links/:id' - Compartir un enlace -URL -Título -Descrpción --Token obligatorio.
 app.post('/links',thisIsUser, newLink);

 //- DELETE - '/links/:id' -Borrar un enlace creado por el mismo usuario, --Token obligatorio.
 app.delete('/links/:id',thisIsUser,linkExists,authEdit,deleteLink);

//POST - '/links/:id/votes' -Votar publicaiones de otros enlaces --Solo se podra votar un vez --Token obligatorio
app.post('/links/:id/votes',thisIsUser,linkExists,voteLink);

//PUT - '/links/:id/votes' -Cambiar tu voto en un enlace--Token obligatorio;
app.put('/links/:id/votes',thisIsUser,voteExist,authEditVote,editVote)

//- PUT - /links/:id  -- Editar título, o descripción del enlace. -Token obligatorio.
app.put('/links/:id',thisIsUser,linkExists,authEdit,editLink);

//- DELETE - '/links/:id/votes' -Borrar un vot creado por el mismo usuario, --Token obligatorio.
app.delete('/links/:id/votes',thisIsUser, voteExist, authEditVote,deleteVote);
//middleware httpStatus
app.use((error, req, res, next) => {
   res.status(error.httpStatus || 500).send({
      status: 'Error',
      message: error.message,
      
   })
});
//middleware Not Found-404
app.use((req,res)=>{
   res.status(404).send({
    status:'Error',
    message:'Not Found'
   })
});

app.listen(PORT,()=>{
   console.log(`Heyyyy I'm here!!! Listening from the port ${PORT}`)
});
