"use strict"

const newUser = require("./newUser");
const validateUser = require("./validateUser");
const userLogin = require("./userLogin.js");
const getUser = require("./getUser");
const editUser = require("./editUser");
const newPsw = require("./newPsw");
const recoverPassword = require('./recoverPassword');
const recoverNewPassword=require("./recoverNewPassword");
const deleteUser = require('./deleteUser');

module.exports = {
    newUser,
    validateUser,
    userLogin,
    getUser,
    editUser,
    newPsw,
    recoverPassword,
    recoverNewPassword,
    deleteUser
};

