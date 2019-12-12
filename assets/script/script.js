// **********************************************
// globals
// **********************************************

var day0Elem = $("#day0"); 
var dayElem;
var citySelListElem = $("#citySelList");  
var cityCountryElem = $("#cityCountry"); 

var newCity={}; 

var cityElem = $("#city");
var day0IconElem = $("#day0Icon"); 
var day0TempElem = $("#day0Temp"); 
var day0HumidityElem = $("#day0Humidity"); 
var day0WindSpeedElem = $("#day0WindSpeed"); 
var day0UVIndexElem = $("#day0UVIndex"); 

var lat = 0; 
var lon = 0; 

// **********************************************
// functions
// **********************************************

// **********************************************
// get UV index 
// **********************************************
function getUVIndex (){

   var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat="
      + lat + "&lon=" + lon + "&appid=" + APIKey;

   console.log('uv');
   //alert ('lat ' + lat + ' lon ' + lon); 
   console.log (queryURL); 

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response) {

      day0UVIndexElem.text(response.value);
      if (parseFloat(response.value) <= 4){
         day0UVIndexElem.removeClass("safe warning danger").addClass("safe"); 
      }
      else if (parseFloat(response.value) > 4 && parseFloat(response.value) <= 7){
         day0UVIndexElem.removeClass("safe warning danger").addClass("warning"); 
      }
      else if (parseFloat(response.value) > 7){
         day0UVIndexElem.removeClass("safe warning danger").addClass("danger"); 
      }
   })

}; // getUVIndex 

// **********************************************
// get current weather 
// **********************************************
function getCurrentWeather (city, country){

   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="
      + city + "," + country + "&units=imperial&appid=" + APIKey;

   //console.log (queryURL); 

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response) {

      day0IconElem.attr("src",  "http://openweathermap.org/img/wn/"
            + response.weather[0].icon 
            + "@2x.png");
      day0TempElem.text(Math.round(response.main.temp));  
      day0HumidityElem.text(Math.round(response.main.humidity));  
      day0WindSpeedElem.text(Math.round(response.wind.speed));  

      lat = response.coord.lat;
      lon = response.coord.lon; 
      getUVIndex();

   })
}; //getCurrentWeather

// **********************************************
// get 5 day forecast 
// 191212: finally took a close look at this. The "5 day" forecast I was using is 5 days, IN 3 HOUR BLOCKS.
//    AND the min/max temps in there aren't for the entire day. Try the 16 day forecast, restrict to 6 days, and use
//    cells 1 thru 5. (0 = today)
// **********************************************
function getFiveDayForecast (city, country){

   var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q="
      + city + "," + country + "&mode=json&units=imperial&cnt=6&appid=" + APIKey;

   //console.log (queryURL); 

   var dayElem;
   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response) {

      var responseList = response.list; 
      for (i=1; i<=5; i++){

         if (i==1){
            //alert('icon ' + responseList[i].weather[0].icon);
         }
         dayElem = $("#day"+i+"Icon");
         dayElem.attr("src", "http://openweathermap.org/img/wn/"
            + responseList[i].weather[0].icon 
            + "@2x.png");
         dayElem = $("#day"+i+"Temp"); 
         //console.log(dayElem); 
         dayElem.text(Math.round(responseList[i].temp.max));
         dayElem = $("#day"+i+"Humidity"); 
         dayElem.text(Math.round(responseList[i].humidity));

      }
   })
}; //getFiveDayForecast

// **********************************************
// getCity 
// **********************************************
function getCity (str){
   return str.slice(0, str.indexOf(',')).trim (); 
}; //getCity

// **********************************************
// getCountry 
// **********************************************
function getCountry (str){
   return str.substr(str.indexOf(',') + 1).trim ();
}; //getCountry

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

   city = getCity(cityCountryElem.val());
   country = getCountry(cityCountryElem.val());
   cityElem.text(city); 
   getCurrentWeather(city, country);
   getFiveDayForecast(city, country); 

}); // search button 

// **********************************************
// click existing city. load it into the search box 
// **********************************************

$("#citySelList").on("click", function () {

   event.preventDefault(); 

   cityBtn=event.target;
   cityCountryElem.val(cityBtn.textContent); 

   var str = cityBtn.textContent; 
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

