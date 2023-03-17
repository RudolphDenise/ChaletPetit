const express = require('express');
//const { Model } = require('mongoose');
const impressumRouter = express.Router()
//const todoModel = require('../models/todo.model')

//Show Todo Page EJS
impressumRouter.get("/", (req, res, next) => {
    console.log('Impressum-Seite geladen')
    res.render("impressum");
    next()
})


module.exports = impressumRouter;