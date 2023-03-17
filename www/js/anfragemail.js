console.log('anfragemail loaded');

//Global Variables
let formMailAnfrage = document.getElementById('formjetzanfragen')
let vorname = document.getElementById('vorname')
let nachname = document.getElementById('nachname')
let emailadresse = document.getElementById('emailadresse')
let telefonnummer = document.getElementById('telefonnummer')
let anreise = document.getElementById('dp1')
let abreise = document.getElementById('dp2')
let personenzahl = document.getElementById('personenzahl')
let radioButtons = formMailAnfrage.hundeanboard
let fragenanmerkungen = document.getElementById('fragenanmerkungen')
let btnkontakt = document.getElementById('btnkontakt')
//Validierungsanzeige / Nutzerfeedback 
let infomail = document.getElementById('infomail')
let infonumber = document.getElementById('infonumber')
let errormail = document.getElementById('errormail')
let errornumber = document.getElementById('errornumber')
//Mailadresse des Empfängers
let mailOfEmpfänger = *****
//let mailOfEmpfänger = ***

//Mailadresse des Sendgrid-Accounts NICHT ÄNDERBAR
const MAILOFSENDGRIDACCOUNT = ****

let btnTest = document.getElementById('testformbtn')
let formTest = document.getElementById('testform')


window.addEventListener("load", (event) => {
  console.log("page is fully loaded");


  let testGetFetch = async function () {
    console.log('btn works');

    const ADD_TEST_GETFETCH_PATH = '/requestmail/get'
    let testFetch = await fetch(ADD_TEST_GETFETCH_PATH)
      .then(res =>
        res.json()).then(d => {
          console.log(d)
        })
  }



  // const selectOptions = formMailAnfrage.personenzahl

  // console.log(btnkontakt);
  // btnkontakt.addEventListener('click', (e)=>{
  //     console.log('Hello World')
  //   })


  // Convert date to local date format from String

  let testDate = '03/11/2023'
  let convertDate = function (bookingdate) {
    //save components of date-string in an array
    let dateStringArray = bookingdate.split("/");
    //get values from arry and create a new dateobject 
    //month -1 because they start with 0
    let month = dateStringArray[0] -1
    let date = dateStringArray[1]
    let year = dateStringArray[2]
    // console.log('year', year);
    // console.log('month', month);
    // console.log('date ', date );
    const EntrydateObj = new Date(year, month, date)
    console.log('EntrydateObj', EntrydateObj);
    return EntrydateObj

  }

  convertDate( 'testDate funktion testen' ,  testDate)

  //Makes a String ownly with date without time in standard local formatting
  let localDateFormat = function (date) {
    let localeDateFormat = date.toLocaleDateString()
    return localeDateFormat
  }


  /** 
   * @returns {object} - All params of the booking Request
   */

  let werteCachen = function () {

    //Plug-in-Code (intl-tel-input), der die ausgewählte Ländervorwahl und Benutzereingabe in das internationale Format umwandelt
    const phoneNumber = phoneInput.getNumber();
    console.log(phoneNumber);
    console.log('anreise.value', anreise.value);
    const CUSTOMER_MESSAGE = {
      vorname: vorname.value,
      nachname: nachname.value,
      emailadresse: emailadresse.value,
      telefonnummer: phoneNumber,
      anreise: localDateFormat(convertDate(anreise.value)),
      abreise: localDateFormat(convertDate(abreise.value)),
      personenzahl: personenzahl.value,
      dogsonboard: radioButtons.value,
      fragenanmerkungen: fragenanmerkungen.value
    }
    console.log('Diese Werte wurden eingegeben:', CUSTOMER_MESSAGE)
    return CUSTOMER_MESSAGE
  }


  /* Validierung des Datums */

  //Vergleich ob ein Tag nicht vor dem anderen liegt
  function compareTime(time1, time2) {
    return new Date(time1) < new Date(time2); // true if time1 is earlier
  }



  // Die Buchungsdauer erfassen
  //https://linuxhint.com/calculate-days-between-two-dates-javascript/
  let buchungsdauer = (d1, d2) => {
    console.log('d1 in buchungsdauer', d1);
    let anreise = convertDate(d1)
    let abreise = convertDate(d2)
    console.log('anreise in buchungsdauer', anreise);
    let difference = abreise.getTime() - anreise.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log('TotalDays:', TotalDays);
    return TotalDays;
  }
  buchungsdauer('02/5/2022', '02/6/2022')

  let validierungBuchungstage = function (d1, d2) {
    let anreise = convertDate(d1)
    let abreise = convertDate(d2)
    let buchungsdauerChache = buchungsdauer(anreise, abreise)
    let abreiseNachAnreise = compareTime(anreise, abreise)
    if (buchungsdauerChache >= 4) {
      console.log('Mindestbuchungsdauer erfüllt: Sie dürfen buchen');
    }
    else if (abreiseNachAnreise) {
      console.log('Richtige Reihenfolge: Sie dürfen buchen')
    }
  }



  let createMessage = function (CUSTOMER_MESSAGE) {
    event.preventDefault()

    const msg = {
      to: mailOfEmpfänger,
      subject: `Buchungsanfrage: ${CUSTOMER_MESSAGE.anreise} - ${CUSTOMER_MESSAGE.abreise}`,
      from: MAILOFSENDGRIDACCOUNT, // Use the email address or domain you verified above
      cc: CUSTOMER_MESSAGE.emailadresse,
      html: ` <p><b>Interessent:</b> ${CUSTOMER_MESSAGE.vorname + ' ' + CUSTOMER_MESSAGE.nachname}<br>
      <b>E-Mail:</b> ${CUSTOMER_MESSAGE.emailadresse}<br> 
      <b>Telefon:</b> ${CUSTOMER_MESSAGE.telefonnummer}<br> 
      <b>Gewünschter Buchungszeitraum:</b> ${CUSTOMER_MESSAGE.anreise} bis ${CUSTOMER_MESSAGE.abreise}<br> 
      <b>Persohnenzahl:</b> ${CUSTOMER_MESSAGE.personenzahl}<br>
      <b>Hunde an Board?:</b> ${CUSTOMER_MESSAGE.dogsonboard}<br> 
      <b>Anmerkungen:</b>${CUSTOMER_MESSAGE.fragenanmerkungen} </p>`
    }

    console.log("msg", msg);
    return msg
  }

  let nachrichtAnServerSchicken = async function (msg) {
    //FETCH
    let msgFETCH = msg
    console.log('msgFETCH', msgFETCH)
    const ADD_CUSTOMER_MAIL_PATH = '/api'

    await fetch(ADD_CUSTOMER_MAIL_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msgFETCH)
    })



  }

  //Validierung Mail

  let mailValidation = function (msg) {



  }

  //Validierung Telefonnummer

  //TODO: https://www.twilio.com/de/blog/-uberprufen-telefonnummerneingabe-html-javascript
  // isValidNumber Funktion zum Funktionieren bringen
  let numberValidation = function (CUSTOMER_MESSAGE) {

    infonumber.style.display = "none";
    errornumber.style.display = "none";
    console.log('CUSTOMER_MESSAGE', CUSTOMER_MESSAGE, 'CUSTOMER_MESSAGE.telefonnummer', CUSTOMER_MESSAGE.telefonnummer);
    console.log('valitdation number:  ', CUSTOMER_MESSAGE.telefonnummer);
    //let valdationNumber = CUSTOMER_MESSAGE.telefonnummer.isValidNumber()
    let valdationNumber = CUSTOMER_MESSAGE.telefonnummer

    if (valdationNumber) {
      infonumber.style.display = "";
      infonumber.innerHTML = `Phone number in E.164 format: <strong>${CUSTOMER_MESSAGE.telefonnummer}</strong>`;
      console.log('valitdation number if ');
    } else {
      errornumber.style.display = "";
      errornumber.innerHTML = `Invalid phone number.`;
      console.log('valitdation number else');
    }
  }


  /** Funktion, in der die einzelen Funktionen im Event-Listerner
   * nacheinander abgerufen werden */


  //TODO: Buchungsvalidierung Werte lesbar machen
  //TODO: IF ELSE Konstrukt sinnvoll anlegen
  let testAllesZusammen = async function () {
    let CUSTOMER_MESSAGE = await werteCachen()
    let msg = createMessage(CUSTOMER_MESSAGE)
    console.log('msg', msg);
    validierungBuchungstage(msg.anreise, msg.abreise)
    console.log('msg.anreise,', msg.anreise,);
    await numberValidation(CUSTOMER_MESSAGE)

    await nachrichtAnServerSchicken(msg)


  }

  /*Eventlisterner der das Formular validiert und abschickt, wenn 
  der Button geklickt wird

  */


  btnkontakt.addEventListener('click', testAllesZusammen)



  // //POST a new Task

  // ADD_BTN.onclick = async (event) => {
  //     event.preventDefault()

  //     if (NEWTASK.value == '') {
  //         console.log('Bitte eine Aufgabe hinzufügen');
  //         NEWTASK.value = 'Bitte eine Aufgabe hinzufügen'
  //     }
  //     else {
  //         let newTask = { todotask: NEWTASK.value }
  //         console.log('You added a task', 'NEWTASK:', newTask);
  //         const ADD_NEW_TASK_PATH = '/todo/post'


  //         fetch(ADD_NEW_TASK_PATH, {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify(newTask)
  //         })
  //             .then((resp) => resp.json())
  //             .then(function (data) {
  //                 console.log('data.todotask:', data.todotask)
  //                 showAllTodos()
  //             })
  //     }
  // }



  // Use the email address or domain you verified above
  //subject: `${CUSTOMER_MESSAGE.vorname}`,
  /* html: ` <h1>Anfrage:</h1>
  <p> <strong>Name:</strong> ${CUSTOMER_MESSAGE.vorname + ' ' + CUSTOMER_MESSAGE.nachname} </p>
  <p> <strong>Personenzahl:</strong> ${CUSTOMER_MESSAGE.personenzahl}  </p>
  <p><strong>Hunde?:</strong> ${CUSTOMER_MESSAGE.dogsonboard} </p>
  <p><strong>Nachricht:</strong> ${CUSTOMER_MESSAGE.fragenanmerkungen} </p>`, */

});

