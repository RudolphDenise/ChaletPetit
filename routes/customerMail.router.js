const express = require('express');
//const { Model } = require('mongoose');
const customerMailRouter = express.Router()
//const todoModel = require('../models/todo.model')
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { response } = require('express');
const apiKey = process.env.SENDGRID_API_KEY
console.log("SendGrid key ", apiKey);
 sgMail.setApiKey(apiKey);


//TEST GET ROUTER

// customerMailRouter.get("/get", async (req, res)=> {
    
//     let testObj = 'Test'
//     console.log(testObj )
//     res.json(testObj )
// })


// POST ROUTER to get VALUES FORM THE MESSAGE 

customerMailRouter.post("/post", async (req, res) => {
    
    sgMail.send(msg)
.then((res) => console.log('e-mail has been send'))
.catch((error) => console.log(error.msg))

    //  try {
         
    //     res.status(200).json(entryToSave)
        
    //  }
    //  catch (error) {
    //     res.status(400).json({ message: error.message })
    //  }

})
  

module.exports = customerMailRouter