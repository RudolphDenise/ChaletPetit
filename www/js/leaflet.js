console.log('leaflet.js loaded');

//Chalet Petit Koordinaten
let chaletLat = 46.685351
let chaletLong = 13.910660
let houseHeardIcon = `<i class="fa-solid fa-house-user"></i>`

//Create customized Icons

   // <svg
    // width="24"
    // height="40"
    // viewBox="0 0 100 100"
    // version="1.1"
    // preserveAspectRatio="none"
    // xmlns="http://www.w3.org/2000/svg"
    // <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
    // </svg>


    //ToDO: Icon größer machen
const hotelIcon = L.divIcon({

    html: `<i class="fa-solid fa-house"></i>`,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    className: 'hotelIcon'
    // iconUrl: '../data/house-solid.svg',
    //shadowUrl: 'leaf-shadow.png',

//     iconSize:     [38, 95], // size of the icon
//    // shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var map = L.map('map').setView([chaletLat, chaletLong], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    scrollWheelZoom: false
}).addTo(map);




//Setzt ein icon 
// var marker = L.marker([chaletLat, chaletLong], {icon: hotelIcon}).addTo(map);

//Erstellt die Sprechblase mit Titel und Bild
var popup = L.popup()
    .setLatLng([chaletLat, chaletLong])
    .setContent( `Chalet Petit  <br />  ${houseHeardIcon}` )
    .openOn(map);



// let setHotelMarker = function() {

//     array.forEach(element => {
//          let lat = element
//          let lng =  element

//          let marker = L.marker([lat, lng]).addTo(map);
        
//     });
// }


