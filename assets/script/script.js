// **********************************************
// globals
// **********************************************

var day0Elem = $("#day0"); 
var dayElem;
var citySelListElem = $("#citySelList");  
var cityCountryElem = $("#cityCountry"); 

var newCity={}; 

// **********************************************
// functions
// **********************************************

// **********************************************
// getCity 
// **********************************************
function getCity (str){
   return str.slice(0, str.indexOf(',')).trim (); 
}; 

// **********************************************
// getCountry 
// **********************************************
function getCountry (str){
   return str.substr(str.indexOf(',') + 1).trim ();
}; 

// **********************************************
// loadCities
// **********************************************
function loadCities () {

   // loop on em, add em to the page 
   var newDiv; 

   // do the for b
   for (i=0; i<cities.length; i++){

      newDiv = $("<div class='citySel'>");
      newDiv.text(cities[i].city + ', ' + cities[i].country);
      newDiv.attr("data-attr",cities[i].city + ', ' + cities[i].country); 
      citySelListElem.append (newDiv); 
   }
} // loadCities

// **********************************************
// init 
// **********************************************
function init () {

   // get the current date and the next 5, loads the fields on the page 
   var dayStr = moment().format ('MM/DD/YYYY');
   day0Elem.text(dayStr);

   for (i=1;i<=5;i++) {
      dayElem = $("#day" + i); 
      dayElem.text(moment().add (i, 'd').format ('MM/DD/YYYY')); 
   }

   // are there any cities already stored? 
   var cityStr=localStorage.getItem(wDBKey); 
   if (cityStr != "" && cityStr != null) {

      cities=JSON.parse(cityStr); 
      loadCities(); 

   }

}; // init 

// **********************************************
// listeners
// **********************************************

// **********************************************
// search button click 
// **********************************************
$("#searchBtn").on("click", function () {

   event.preventDefault(); 
   alert (cityCountryElem.val()); 

}); // search button 

// **********************************************
// click existing city. load it into the search box 
// **********************************************

$("#citySelList").on("click", function () {

   event.preventDefault(); 

   cityBtn=event.target;
   cityCountryElem.val(cityBtn.textContent); 

   var str = cityBtn.textContent; 
   alert (str.indexOf(',') - 1);
   newCity = {
      "city": getCity(str), 
      "country": getCountry(str), 
      "user-entry": cityBtn.textContent, 
      "search-dttm": moment().format('MM/DD/YYYY')
   }; 
   console.log(newCity); 

}); // city/country list  

// **********************************************
// main
// **********************************************

$(document).ready(function() {
   init ();
});

