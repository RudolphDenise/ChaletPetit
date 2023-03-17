const express = require('express');
//const { Model } = require('mongoose');
const datenschutzRouter = express.Router()
//const todoModel = require('../models/todo.model')

//Show Todo Page EJS
datenschutzRouter.get("/", (req, res, next) => {
    console.log('Datenschutz-Seite geladen')
    res.render("datenschutz");
    next()
})


module.exports = datenschutzRouter;