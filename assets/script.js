//WHEN I search for a city
//THEN I am presented with cirrent and future condition for that city and that city is added to the search history 
const searchBtn = document.getElementById('search-button')
const APIkey = '211ebe8992749f44e55ed545dc0cf9a8';
//5 day forecast api = https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=d2ee20e2eb15e888df5d53206e353c5d
//var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey;
const seattle = 'https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=211ebe8992749f44e55ed545dc0cf9a8';
const seattleBtn = document.getElementById('seattle-button');
const austinBtn = document.getElementById('austin');
const chicBtn = document.getElementById('chicago');
const nyBtn = document.getElementById('new-york');
const orlandoBtn = document.getElementById('orlando');
const sfBtn = document.getElementById('san-francisco');
const denverBtn = document.getElementById('denver');
const atlBtn = document.getElementById('atlanta');

var currentTemp = document.querySelector('.current-temp')
var currentWind = document.querySelector('.current-wind')
var currentHumidity = document.querySelector('.current-humidity')
var currentUV = document.querySelector('.current-uv-index')
var currentCity = document.querySelector('.current-city');
var currentDate = document.getElementById('#current-date');
var currentIcon = document.querySelector('.current-icon');
var citiesSearched = $("#buttons");

var latitude;
var longitude;
var searchHistory = []

//getHistory();

var storedWeather = JSON.parse(localStorage.getItem("weather")) || [];
var apiKey = '211ebe8992749f44e55ed545dc0cf9a8';

function validCity() {

  var searchInput = $('#searchBar').val();

  var weatherSearch = 'https://api.openweathermap.org/data/2.5/weather?q='+searchInput+'&appid='+apiKey;
  var forecastSearch = 'https://api.openweathermap.org/data/2.5/forecast?q='+searchInput+'&appid='+apiKey;
  
  $.ajax({
    url: weatherSearch,
    method: 'GET'
  }).then(function(response){
    console.log(response);
    let tempWeather = response;
    let city = tempWeather.name;
    let latitude = tempWeather.coord.lat;
    let longitude = tempWeather.coord.lon;
    let wind_speed = tempWeather.wind.speed;
    let humidity = tempWeather.main.humidity;
    let temperature = tempWeather.main.temperature; 
    var oneCallSearch = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + tempWeather.coord.lat + '&lon=' + tempWeather.coord.lon + '&units=imperial&appid=211ebe8992749f44e55ed545dc0cf9a8&units=imperial'


    $.ajax({
      url: forecastSearch,
      method: 'GET'
    }).then(function(response){
      console.log("forecast",response);
        var callDay1 = response.list[7].dt_txt;
        var callDay2 = response.list[15].dt_txt;
        var callDay3 = response.list[23].dt_txt;
        var callDay4 = response.list[31].dt_txt;
        var callDay5 = response.list[39].dt_txt;
        console.log('five day',callDay3);
      $.ajax({
        url: oneCallSearch,
        method: 'GET'
      }).then(function(response){
        console.log("onecall",response)
        let timezone = response.timezone; 
        
        for (i = 0; i < 5; i++) {
          /*var nextDay = moment("MM-DD-YYYY").add(i, 'd');
          console.log("looking for the next day",nextDay)
          var fiveDay = document.querySelector('.date'+i)
          console.log(fiveDay);
          fiveDay.textContent = nextDay;*/
          
          var nextTemp = data.daily[i].temp.day
          console.log(nextTemp);
          var fiveTemp = document.querySelector('.temp'+i)
          console.log(fiveTemp)
          fiveTemp.textContent = nextTemp
          
          var nextWind = data.daily[i].wind_speed
          console.log(nextWind)
          var fiveWind = document.querySelector('.wind'+i)
          console.log(fiveWind)
          fiveWind.textContent = nextWind
          
          var nextHumidity = data.daily[i].humidity
          console.log(nextHumidity)
          var fiveHumidity = document.querySelector('.humidity'+i)
          console.log(fiveHumidity)
          fiveHumidity.textContent = nextHumidity
        

        /*let weatherObj = {
          'location': city,
          'date': 
        }*/

        tempObject.location = 'Seattle';
        tempObject.date = '01/20/22'
       searchHistory.push(tempObject);

        localStorage.setItem("weather", JSON.stringify(searchHistory))
      }
  })
  })
})}



    

