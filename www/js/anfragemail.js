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
//TEST BTN
let btTest = document.getElementById('bttest')
//Validierungsanzeige / Nutzerfeedback 
let infomail = document.getElementById('infomail')
let infonumber = document.getElementById('infonumber')
let errormail = document.getElementById('errormail')
let errornumber = document.getElementById('errornumber')
let feedbackDivArrivalAfterDepature = document.getElementById('feedbackarrivalafterdepature')
let feedbackBookingToShort = document.getElementById('feedbackbookingtoshort')
let calendar = document.getElementById("ui-datepicker-div")

// Obj to save the season of arrival Date
seasonObj = {
  season: {
    winter: false,
  }
}


//Mailadresse des Empfängers
let mailOfEmpfänger = 'denise.rudolph.uni@gmail.com'
//let mailOfEmpfänger = 'roman.roznovsky@gmail.com'
//Mailadresse des Sendgrid-Accounts NICHT ÄNDERBAR
const MAILOFSENDGRIDACCOUNT = 'denise.rudolph.uni@gmail.com'
let btnTest = document.getElementById('testformbtn')
let formTest = document.getElementById('testform')


window.addEventListener("load", (event) => {
  console.log("page is fully loaded");

  // *******************
  /* Conversion of date */
  // *******************

  let testdate1 = '09/04/2023'
  let testdate2 = '02/15/2023'

  // Convert date from array to dateobj
  let testDate = '02/11/2023'
  let convertDate = function (bookingdate) {
    //save components of date-string in an array
    let dateStringArray = bookingdate.split("/");
    //get values from arry and create a new dateobject 
    //month -1 because they start with 0
    let month = dateStringArray[0] - 1
    let date = dateStringArray[1]
    let year = dateStringArray[2]
    // console.log('year', year);
    // console.log('month', month);
    // console.log('date ', date );
    const EntrydateObj = new Date(year, month, date)
    //console.log('EntrydateObj convertiertes Datum:', EntrydateObj);
    return EntrydateObj

  }


  let convertierungtest = convertDate(testDate)
  console.log('convertierungtest', convertierungtest);


  //Makes a String only with date without time in standard local formatting
  let localDateFormat = function (date) {
    let localeDateFormat = date.toLocaleDateString('de-AT')
    return localeDateFormat
  }


  /** 
   * @returns {object} - All params of the booking Request
   */

  let werteCachen = function () {

    //Plug-in-Code (intl-tel-input), der die ausgewählte Ländervorwahl und Benutzereingabe in das internationale Format umwandelt
    const phoneNumber = phoneInput.getNumber();
    console.log(phoneNumber);

    const CUSTOMER_MESSAGE = {
      vorname: vorname.value,
      nachname: nachname.value,
      emailadresse: emailadresse.value,
      telefonnummer: phoneNumber,
      //Convert string in DateObj
      // Format des Date-Pickers: anreise.value: 25/1/2023  Tag Monat Jahr 
      //Format nach Convertierung: Dateobjekt ohne Zeit (00:00)
      anreise: convertDate(anreise.value),
      abreise: convertDate(abreise.value),
      personenzahl: personenzahl.value,
      dogsonboard: radioButtons.value,
      fragenanmerkungen: fragenanmerkungen.value
    }
    console.log('Diese Werte wurden eingegeben:', CUSTOMER_MESSAGE)
    return CUSTOMER_MESSAGE
  }


  // Feedback if Form is complete
  //Nice to have: Geht es weniger sperrig?

  let alertIncompletePromt = function (CUSTOMER_MESSAGE) {
    //Resets display of the divs with an alert
    document.getElementById('feedbackVorname').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackVorname').innerHTML = ''

    document.getElementById('feedbackNachname').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackNachname').innerHTML = ''

    document.getElementById('feedbackMail').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackMail').innerHTML = ''

    document.getElementById('feedbackNummer').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackNummer').innerHTML = ''

    document.getElementById('feedbackAnreise').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackAnreise').innerHTML = ''

    document.getElementById('feedbackAbreise').classList.remove('alert', 'alert-danger')
    document.getElementById('feedbackAbreise').innerHTML = ''

    //Checks if the customer entered something

    if (CUSTOMER_MESSAGE.vorname == '') {
      document.getElementById('feedbackVorname').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackVorname').innerHTML = 'Bitte gib deinen Vornamen ein'
    }
    if (CUSTOMER_MESSAGE.nachname == '') {
      document.getElementById('feedbackNachname').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackNachname').innerHTML = 'Bitte gib deinen Nachnamen ein'
    }
    if (CUSTOMER_MESSAGE.emailadresse == '') {
      document.getElementById('feedbackMail').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackMail').innerHTML = 'Bitte gib deine E-Mail-Adresse ein'
    }
    if (CUSTOMER_MESSAGE.telefonnummer == '') {
      document.getElementById('feedbackNummer').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackNummer').innerHTML = 'Bitte gib deine Telefonnummer ein'
    }

    /* The second condition is used, because after the customer deleted 
    a field the value of the field is NaN */
    if ((CUSTOMER_MESSAGE.anreise == '') || (isNaN(CUSTOMER_MESSAGE.anreise))) {
      document.getElementById('feedbackAnreise').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackAnreise').innerHTML = 'Bitte wähle deinen Anreisetag aus'
    }
    if (CUSTOMER_MESSAGE.abreise == '' || (isNaN(CUSTOMER_MESSAGE.abreise))) {
      document.getElementById('feedbackAbreise').classList.add('alert', 'alert-danger')
      document.getElementById('feedbackAbreise').innerHTML = 'Bitte wähle deinen Abreisetag aus'
    }


  }

  //Prove if all inputs of form are filled in
  function validateAllFormInputsfilledIn() {
    // Holen Sie sich alle Eingabefelder im Formular
    var inputs = formMailAnfrage.getElementsByTagName("input");
    // Schleife durch die Eingabefelder und prüfen Sie, ob sie ausgefüllt wurden
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        // Wenn ein Eingabefeld leer ist, geben Sie false zurück
        return false;
      }
    }
    // Wenn alle Eingabefelder ausgefüllt sind, geben Sie true zurück
    return true;
  }


  //Prove if no allert is left
  function allFeedbackdivsEmpty() {


    // Holen Sie sich alle Eingabefelder im Formular
    var feedbackdiv = formMailAnfrage.getElementsByClassName("feedbackdiv");
    console.log(feedbackdiv);
    // Schleife durch die Eingabefelder und prüfen Sie, ob sie ausgefüllt wurden
    for (var i = 0; i < feedbackdiv.length; i++) {

      if (!(feedbackdiv[i].innerHTML == '')) {
        console.log(feedbackdiv[i], feedbackdiv[i].innerHTML);
        console.log('hELLO');
        // Wenn ein Eingabefeld leer ist, geben Sie false zurück
        return false;
      }
    }

    // Wenn alle Eingabefelder ausgefüllt sind, geben Sie true zurück
    return true;
  }


  // Function which produces an alert if RegEx is not right
  let alertMailFormat = function (isFormatRight, mail = '') {
    let errormail = document.getElementById('errormail')
    errormail.classList.remove('alert', 'alert-primary')
    errormail.innerHTML = ''
    if (!isFormatRight) {
      errormail.classList.add('alert', 'alert-primary')
      errormail.innerHTML = `Überprüfe, ob du deine E-Mail-Adresse <b>${mail}</b> richtig eingegeben hast</>`
    }
  }


  // Function which produces an alert if RegEx is not right
  let alertNumberFormat = function (isFormatRight, number = '') {
    let errornumber = document.getElementById('errornumber')
    errornumber.classList.remove('alert', 'alert-primary')
    errornumber.innerHTML = ''

    if (!isFormatRight) {
      errornumber.classList.add('alert', 'alert-primary')
      errornumber.innerHTML = `Überprüfe, ob du deine Telefonnummer <b>${number}</b> richtig eingegeben hast</>`
    }
  }


  // *******************
  /* Validation of date */
  // *******************

  //Compare if arrival is before depature
  function compareIfArriavalBeforeDepature(time1, time2) {
    return time1 < time2; // true if time1 is earlier
  }


  //Visual feedback alert if arrival is after depature
  let arrivalAfterDepatureAlert = function (isChronologyRight) {
    feedbackDivArrivalAfterDepature.innerHTML = ""
    feedbackDivArrivalAfterDepature.classList.remove('alert', 'alert-danger')

    if (!isChronologyRight) {
      feedbackDivArrivalAfterDepature.classList.add('alert', 'alert-danger')
      feedbackDivArrivalAfterDepature.innerHTML = `Hoppala, da ist etwas schief gelaufen! <br>
    Bitte überprüfe und korregiere Deine Buchungsdaten.`
    }
  }

  // Convert Date for isBookingWinterSeason Function
  let convertDateforisBookingWinterSeason = function (datum) {
    //save components of date-string in an array
    //'2022-12-24'
    let dateStringArray = datum.split("/");
    //get values from arry and create a new dateobject 
    console.log(dateStringArray);
    let month = dateStringArray[1]
    let date = dateStringArray[2]
    let year = dateStringArray[0]
    // console.log('year', year);
    // console.log('month', month);
    // console.log('date ', date );
    const string = `${year}-${month}-${date} `
    console.log('string  convertiertes Datum: ', '2022-12-24:', string);
    return string
  }


  /* Function to find out if BookingDate is in winter or summer season */

  let isBookingWinterSeason = function (dateAnreise) {
    let date = dateAnreise
    console.log('date', date);
    let year = date.getFullYear()
    console.log('year', year);
    //SummerSeason
    const summerStart = new Date(year, 3, 9); // 9. April
    const summerEnd = new Date(year, 11, 24); // 24. Dezember

    if ((dateAnreise <= summerStart) || (dateAnreise >= summerEnd)) {
      seasonObj.season.winter = true
      console.log('Sie reisen im Winter an');

    }

    else {
      seasonObj.season.winter = false
      console.log('Sie reisen im Sommer an');

    }
  }

  // Find out Booking duration 
  //https://linuxhint.com/calculate-days-between-two-dates-javascript/
  let buchungsdauer = (d1, d2) => {
    console.log('d1 in buchungsdauer', d1);
    let anreise = d1
    let abreise = d2
    //console.log('anreise in buchungsdauer', anreise);
    let difference = abreise - anreise
    console.log('difference', difference);
    let bookedNights = Math.ceil(difference / (1000 * 3600 * 24));
    let TotalDays = bookedNights + 1
    console.log('TotalDays:', TotalDays);
    console.log('bookedNights:', bookedNights);
    return TotalDays;
  }

  // //Feedback alert if booking is to short 

  let durationNotAllowedAlert = function (iswinter, duration) {
    feedbackBookingToShort.innerHTML = ""
    //+1 because Return (duration) of 'buchungsdauer' function is only for nights
    let buchungsdauer = duration + 1
    //Saisonale Mindestbuchungdauer Text
    let winter = `In der Wintersaison (01.01 - 09.04 sowie 24.12 - 31.12) kann das Chalet Petit 
    ab einer Buchungsdauer von sieben Tagen vermietet werden`

    let summer = `In der Sommersaison vom 24.12 - 09.04. kann das Chalet Petit 
    ab einer Buchungsdauer von vier Tagen vermietet werden`

    if (iswinter && (buchungsdauer <= 7)) {
      feedbackBookingToShort.classList.add('alert', 'alert-primary')
      feedbackBookingToShort.innerHTML = `${winter}`
      console.log('Sie müssen mindestens 7 Tage Buchen');
    }
    else if (!iswinter && (buchungsdauer <= 4)) {
      feedbackBookingToShort.classList.add('alert', 'alert-primary')
      feedbackBookingToShort.innerHTML = `${summer}`
      console.log('Sie müssen mindestens 4 Tage Buchen');
    }
    else {
      feedbackBookingToShort.classList.remove('alert', 'alert-primary')
      feedbackBookingToShort.innerHTML = ``
      console.log('Die Buchung ist in Ordnung');

    }
  }

  let createMessage = function (CUSTOMER_MESSAGE) {
    event.preventDefault()

    const msg = {
      to: mailOfEmpfänger,
      subject: `Buchungsanfrage: ${CUSTOMER_MESSAGE.anreise} - ${CUSTOMER_MESSAGE.abreise} `,
      from: MAILOFSENDGRIDACCOUNT, // Use the email address or domain you verified above
      cc: CUSTOMER_MESSAGE.emailadresse,
      html: ` < p > <b>Interessent:</b> ${CUSTOMER_MESSAGE.vorname + ' ' + CUSTOMER_MESSAGE.nachname} <br>
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


   //FETCH
  let nachrichtAnServerSchicken = async function (msg) {
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
  let mailValidation = function (CUSTOMER_MESSAGE) {
    const regex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(CUSTOMER_MESSAGE.emailadresse)
  }
  //Validation if number is in E.164 format
  let numberValidation = function (CUSTOMER_MESSAGE) {
    const internationalPhoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return internationalPhoneNumberRegex.test(CUSTOMER_MESSAGE.telefonnummer)
  }

  let openAndCloseCanvas = function () {
    let formCanvas = bootstrap.Offcanvas.getInstance(jetztanfragen);
    console.log('formCanvas', formCanvas);
    formCanvas.hide();
    //let dankeCanvas = document.getElementById('offcanvasdanke')
    //let dankeCanvasI = await bootstrap.Offcanvas.getInstance(dankeCanvas);
    /*The code is different here because there is a need that the offcanvas
    is opened once by the button to create and  initialize with the show()-method of the Offcanvas-Object
    This offcanvas-constructor-function makes it possible to create and initialize the canvas
    without clicking the button just with code 
    after it the variable "dankeCanvasI" is not "null" */
    dankeCanvasI = new bootstrap.Offcanvas(offcanvasdanke)
    console.log('dankeCanvasI', dankeCanvasI);
    dankeCanvasI.show();
    console.log('Du hast das Formular abgesendet');
  }

  /** Funktion, in der die einzelen Funktionen im Event-Listerner
   * nacheinander abgerufen werden */


  // Everything together

  let testFunktion = async function () {
    //event.preventDefault()
    let CUSTOMER_MESSAGE = await werteCachen()
    //User feedback if promt is incomplete
    alertIncompletePromt(CUSTOMER_MESSAGE)
    //Find out the booking duration
    let bookingDuration = buchungsdauer(CUSTOMER_MESSAGE.anreise, CUSTOMER_MESSAGE.abreise)
    //console.log('TEST: buchungsdauer', dauerbuchung);
    // Find out which season: summer or winter
    isBookingWinterSeason(CUSTOMER_MESSAGE.anreise)
    console.log('seasonObj.season.winter ', seasonObj.season.winter);
    let iswinter = seasonObj.season.winter
    //Alert if the booking is to short for the season
    durationNotAllowedAlert(iswinter, bookingDuration)

    //Find out if Arrival is before Depature
    let isChronologyRight = compareIfArriavalBeforeDepature(CUSTOMER_MESSAGE.anreise, CUSTOMER_MESSAGE.abreise)
    //Alert if Arrival is after Depature
    arrivalAfterDepatureAlert(isChronologyRight)

    // //Find out if mail has  a regular format
    // isMailFormatRight = mailValidation(CUSTOMER_MESSAGE.emailadresse)
    // //Alert if mail has not a regular format
    // alertMailFormat(isMailFormatRight, CUSTOMER_MESSAGE.emailadresse)
    // //Find out if mail has  a regular format
    // isNumberFormatRight = numberValidation(CUSTOMER_MESSAGE.telefonnummer)
    //  //Alert if number has not a regular format
    // alertNumberFormat(isNumberFormatRight, CUSTOMER_MESSAGE.telefonnummer)

    //Validate if every Input is filled in
    let inputes = validateAllFormInputsfilledIn()
    console.log('inputes', inputes);
    //Validate if all feedbackdivs are empty
    let feedbackdivs = allFeedbackdivsEmpty()
    console.log('feedbackdivs', feedbackdivs);
    // create Message and Fetch if everything is filled out 
    if (inputes && feedbackdivs) {
      let msg = createMessage(CUSTOMER_MESSAGE)
      console.log('msg', msg);
      console.log('msg.anreise,', msg.anreise,);
      // Formular senden (mit AJAX oder einer anderen Methode)
      // Fetch the message to Server
      await nachrichtAnServerSchicken(msg)
      //Close OffCanvas of the Form open OffCanvasDanke
      openAndCloseCanvas()
    }
  }

  /*Eventlisterner der das Formular validiert und abschickt, wenn 
  der Button geklickt wird
 
  */
  //BTN 
  btTest.addEventListener('click', testFunktion)




 








});

