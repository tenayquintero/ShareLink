'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fileupload = require('express-fileupload');

//Importaciones Locales

const { PORT, STATIC_FILE } = process.env;
const {
  newUser,
  validateUser,
  userLogin,
  getUser,
  editUser,
  newPsw,
  recoverPassword,
  recoverNewPassword,
  deleteUser,
} = require('./controllers/users');
const thisIsUser = require('./middlewares/thisIsUser');
const {
  newLink,
  listLink,
  getLink,
  deleteLink,
  voteLink,
  editLink,
  editVote,
  deleteVote,
  ownerLink,
} = require('./controllers/links');

//middelwares locales
const userExist = require('./middlewares/userExist');
const linkExists = require('./middlewares/linkExist');
const authEdit = require('./middlewares/authEdit');
const voteExist = require('./middlewares/voteExist');
const authEditVote = require('./middlewares/authEditVote');

const app = express();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(fileupload());
app.use(express.static(path.join(__dirname, STATIC_FILE)));

/**
 * USERS
 */

//POST - '/users' - Creación de usuario sin activar - obligatorio email y password.
app.post('/users', newUser);

//- PUT - '/users/validate' - Validaremos al usuario que se ha registrado.
app.put('/users/validate', validateUser);

//POST - '/users/login' - Comprobar que el usuario existe -mail y password obligatoria - Devolverá el token.
app.post('/users/login', userLogin);

//- GET - '/users/:id'
app.get('/users/:id', userExist, thisIsUser, getUser);

//- PUT - '/users/:id' -- Editar perfil del usuario(Nombre, Email, Biografía, Foto, …) Token obligatorio
app.put('/users/:id', userExist, thisIsUser, editUser);

// PUT - '/users/:id/password' - Que el usuario pueda editar su contraseña --Token obligatorio.
app.put('/users/:id/password', thisIsUser, newPsw);

// POST - '/users/recoverPassword' - Que el usuario pueda recuperar su contraseña --Token obligatorio.
app.post('/users/recover_password', recoverPassword);

// POST - '/users/recoverPassword' - Que el usuario pueda editar su contraseña --Token obligatorio.
app.post('/users/reset_password', recoverNewPassword);

// DELETE- '/users/recoverPassword' - Borrado lógico. Solo dueño y admin --Token obligatorio.
app.delete('/users/:id', userExist, thisIsUser, deleteUser);

/**
 * LINKS
 */
//GET - '/links' - Ver enlaces publicados por orden de publicación de más actual a anterior.
app.get('/links', thisIsUser, listLink);

//GET - '/links/:id' - Ver información de una publicación específica.
app.get('/links/:id', linkExists, getLink);

//GET - /links/mylinks - Ver todos los links compartidos del usuario
app.get('/mylinks', thisIsUser, ownerLink);

// POST - '/links/:id' - Compartir un enlace -URL -Título -Descrpción --Token obligatorio.
app.post('/links', thisIsUser, newLink);

//- DELETE - '/links/:id' -Borrar un enlace creado por el mismo usuario, --Token obligatorio.
app.delete('/links/:id', thisIsUser, linkExists, authEdit, deleteLink);

//POST - '/links/:id/votes' -Votar publicaiones de otros enlaces --Solo se podra votar un vez --Token obligatorio
app.post('/links/:id/votes', thisIsUser, linkExists, voteLink);

//PUT - '/links/:id/votes' -Cambiar tu voto en un enlace--Token obligatorio;
app.put('/links/:id/votes', thisIsUser, voteExist, authEditVote, editVote);

//- PUT - /links/:id  -- Editar título, o descripción del enlace. -Token obligatorio.
app.put('/links/:id', thisIsUser, linkExists, authEdit, editLink);

//- DELETE - '/links/:id/votes' -Borrar un vot creado por el mismo usuario, --Token obligatorio.
app.delete('/links/:id/votes', thisIsUser, voteExist, authEditVote, deleteVote);

//middleware httpStatus
app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
//middleware Not Found-404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not Found',
  });
});

app.listen(PORT, () => {
  console.log(`Heyyyy I'm here!!! Listening from the port ${PORT}`);
});
