//Test
require('dotenv').config();

const express = require('express');
const app = express()
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const { readFile } = require('fs/promises')
const PORT = process.env.PORT || 5000
const mongoString = process.env.DATABASE_URL


/* sendGrid Stuff */
//require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_API_KEY
//console.log("SendGrid key ", apiKey);
sgMail.setApiKey(apiKey);


//Template Engine
// app.use(expressLayouts)
app.set("view engine", "ejs")


//connection to database
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

//makes static files available
//  app.use(express.static('www'))

app.use(express.static(__dirname + '/www'))
//Middleware that 
app.use(express.urlencoded({ extended: true }))
// all responses get a CORS-Header
app.use((req, res, next) => {
    // Response-Header für alle Responses wird gesetzt...
    res.set('Access-Control-Allow-Origin', '*')
    next()
})
//Middleware Snippet allows accept data in JSON format
app.use(express.json());

// Route for Home 
app.get("/", (req, res, next) => {
    console.log('Startseite geladen')
    res.render("index");
    next()
})

app.post("/api", (req, res) => {

    let customerMail = req.body
    console.log('Post Anfrage erhalten');
    res.send('Post Anfrage erhalten')
    console.log('req.body', customerMail);

    (async () => {
        try {
            await sgMail.send(customerMail);
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();

})

//Integrate other Modul-Routes 
const impressumRoutes = require('./routes/impressum.route');
app.use('/impressum', impressumRoutes)

const datenschutzRoutes = require('./routes/datenschutz.route');
app.use('/datenschutz', datenschutzRoutes)

// //???TODO: checken Hat nicht funktioniert 
const mail = require('./routes/customerMail.router');
app.use('/requestmail', mail)


//generates HTTP Server 
app.listen(PORT, () => {
    console.log('Server Started at Port:', PORT)
})














