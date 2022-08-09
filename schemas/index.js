"use strict";
const Joi = require("joi");

const registrationSchema = Joi.object().keys({
    email: Joi.string().required().email().max(100).error(
        new Error('The email must be a valid email')
    ),
    password: Joi.string().required().min(6).max(20).error(
        new Error("Password length not correct, must be between 6-20")
    ),
});

const registrationLink = Joi.object().keys({
    url: Joi.string().uri().required().error(
        new Error('The url must be valid')
    ),
    title: Joi.string().required().min(4).max(100).error(
        new Error("Title length not correct, must be between 4-100 ")
    ),
    description: Joi.string().required().min(4).max(200).error(
        new Error("Description length not correct, must be between 4-200")
    ),
});

const newPasswordSchema= Joi.object().keys({
    oldPassword: Joi.string().required().error(
        new Error("The oldPassword is require")
),
    newPassword: Joi.string().required().regex(/[^\s]$/).min(6).max(20).error(
        new Error("Password length not correct, must be between 6-20")
    )
})

module.exports ={registrationSchema, registrationLink,newPasswordSchema};
