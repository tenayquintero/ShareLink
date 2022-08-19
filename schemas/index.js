"use strict";
const Joi = require("joi");

    //Validación registro nuevo usuaio.
const registrationSchema = Joi.object().keys({
    email: Joi.string().required().email().max(100).messages(
        new Error("The email must be a valid email")
    ),
    password: Joi.string().required().regex(/^\S+$/).min(6).max(20).error(
        new Error("Password length not correct, remember it must have a length between 6-20 without empty spaces",)

    )
});

     //Validación nuevo link
const registrationLink = Joi.object().keys({
    url: Joi.string().uri().required().error(
        new Error('The url must be valid')
    ),
    title: Joi.string().required().min(4).max(100).error(
        new Error("Title length not correct, must be between 4-100 ")
    ),
    description: Joi.string().required().min(4).max(200).error(
        new Error("Description length not correct,it must be between 4-200")
    ),
});


     //Validación nueva contraseña
const newPasswordSchema = Joi.string().required().regex(/^\S+$/).min(6).max(20).error(
    new Error("Password not correct, remember it must have a length between 6-20 without empty spaces "));


    //Validación actualización datos usuario    
const editUserSchema = Joi.object().keys({
    name: Joi.string().max(50).error(
        new Error("The length name is not correct it must be less 50 characters long")
    ),
    email: Joi.string().required().email().max(100).messages({
        "string.email": "The email must be a valid email",
        "any.required": "The email is required"
    }
    ),
    perfil: Joi.string().max(150).error(
        new Error("The length name is not correct it must be less 150 characters long")
    )
})
module.exports = { registrationSchema, registrationLink, newPasswordSchema, editUserSchema };
