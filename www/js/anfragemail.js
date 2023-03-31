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



  let testGetFetch = async function () {
    console.log('btn works');

    const ADD_TEST_GETFETCH_PATH = '/requestmail/get'
    let testFetch = await fetch(ADD_TEST_GETFETCH_PATH)
      .then(res =>
        res.json()).then(d => {
          console.log(d)
        })
  }



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
//TODO: fertigstellen
  
let feedbackIsComplete = function(CUSTOMER_MESSAGE){

  switch('') {
    case CUSTOMER_MESSAGE.vorname :
      console.log('Bitte gib einen Vornamen ein');

      case CUSTOMER_MESSAGE.nachname:
      console.log('Bitte gib ein Telefonnummer ein');

      case CUSTOMER_MESSAGE.emailadresse:
        console.log('Bitte gib ein Telefonnummer ein');
    
    case CUSTOMER_MESSAGE.telefonnummer:
      console.log('Bitte gib ein Telefonnummer ein');

      case CUSTOMER_MESSAGE.anreise:
        console.log('Bitte gib ein Telefonnummer ein');

        case CUSTOMER_MESSAGE.abreise:
          console.log('Bitte gib ein Telefonnummer ein');
   
    // case 'orange':
    //   console.log('This is an orange.');
      
    // default:
    //   console.log('This is not a banana, apple, or orange.');
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


    if (!isChronologyRight) {
      anreise.classList.add('alert', 'alert-danger')
      abreise.classList.add('alert', 'alert-danger')
      feedbackDivArrivalAfterDepature.classList.add('alert', 'alert-danger')
      feedbackDivArrivalAfterDepature.innerHTML = `Hoppala, da ist etwas schief gelaufen! <br>
    Bitte überprüfe und korregiere Deine Buchungsdaten.`

    }
    else {
      anreise.classList.remove('alert', 'alert-danger')
      abreise.classList.remove('alert', 'alert-danger')
      feedbackDivArrivalAfterDepature.innerHTML = ""

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

  convertDateforisBookingWinterSeason('2022/12/24')








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





  // // anreise.addEventListener('focus', currentSeasonObj)
  // // anreise.addEventListener('focusout', currentSeasonObj)
  // // abreise.addEventListener('focus', currentSeasonObj)



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



//## POP-UP if form was send succesfully

let formSuccesPopup = function(){

}


//



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
    // cache the values of the form
    let CUSTOMER_MESSAGE = await werteCachen()

    //Validation of the arrival & depature


    //User Feedback


    let msg = createMessage(CUSTOMER_MESSAGE)
    console.log('msg', msg);

    console.log('msg.anreise,', msg.anreise,);

    // Fetch the message to Server
    //await nachrichtAnServerSchicken(msg)


  }

  // Testfunktion für BT TEst

  let testFunktion = async function () {
    let CUSTOMER_MESSAGE = await werteCachen()
    feedbackIsComplete(CUSTOMER_MESSAGE) 
    let dauerbuchung = buchungsdauer(CUSTOMER_MESSAGE.anreise, CUSTOMER_MESSAGE.abreise)
    console.log('TEST: buchungsdauer', dauerbuchung);

    isBookingWinterSeason(CUSTOMER_MESSAGE.anreise)
    console.log('seasonObj.season.winter ', seasonObj.season.winter);
    let iswinter = seasonObj.season.winter

     durationNotAllowedAlert(iswinter, dauerbuchung ) 

  }





  /*Eventlisterner der das Formular validiert und abschickt, wenn 
  der Button geklickt wird
 
  */


  btnkontakt.addEventListener('click', testAllesZusammen)

  //BT TEst 

  btTest.addEventListener('click', testFunktion)




});

