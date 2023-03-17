//TODO: mail. js konnte erst auf .env Datei zugreifen, nachdem 
// sie in der Ordnerstruktur auf die selbe Ebene wie app.js gegeben wurde 
//Wie kann man das ändern? 
// require('dotenv').config();
// const sgMail = require('@sendgrid/mail');
// const { response } = require('express');
// const apiKey = process.env.SENDGRID_API_KEY
// console.log("SendGrid key ", apiKey);
//  sgMail.setApiKey(apiKey);





 
const msg = {
  to: 'denise.rudolph.uni@gmail.com',
  from: {
    name: 'Chalet Petit',
    email: 'denise.rudolph.uni@gmail.com'
}, // Use the email address or domain you verified above
  subject: 'Anfrage Charlet .env Save',
  text: 'Yeah',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg)
.then((response) => console.log('e-mail has been send'))
.catch((error) => console.log(error.msg))










// //ES6npm
// sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// })();