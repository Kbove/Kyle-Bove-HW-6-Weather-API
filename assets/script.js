//WHEN I search for a city
//THEN I am presented with cirrent and future condition for that city and that city is added to the search history 
const searchBtn = document.getElementById('search-button')
const APIkey = '211ebe8992749f44e55ed545dc0cf9a8';

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

getHistory();

function validCity() {
    userInput = document.getElementById('searchBar').value;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + "&appid=d2ee20e2eb15e888df5d53206e353c5d";
  
    fetch(url)
      .then(function (response) {
        if(response.ok) {
            userInput = city
            getLatLong();
            saveSearch();
            return response.json();
          } else if (response === 404){
            return Promise.reject('error 404')
          } else {
            return Promise.reject('some other error: ' + response.status)
        }}
      )}
        
function getLatLong() {
    city = document.getElementById('searchBar').value;
    checkURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=211ebe8992749f44e55ed545dc0cf9a8&units=imperial';

    fetch(checkURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            latitude = data.coord.lat;
            longitude = data.coord.lon;
            city = data.name;
            temp = data.main.temp;
            wind = data.wind.speed;
            humidity = data.main.humidity;

            getApi();
            
        })
} 

function getApi() {
   var queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=211ebe8992749f44e55ed545dc0cf9a8&units=imperial'
   fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
            var date = moment().format("MM/DD/YYYY");
            currentCity.textContent = city + " " + date;
            currentTemp.textContent = temp;
            currentWind.textContent = wind;
            currentHumidity.textContent = humidity;
            currentUV.textContent = data.current.uvi;

            console.log(data)
     
      for (i = 0; i < 5; i++) {
        var nextDay = moment(i+1,'d').format('MM/DD/YYYY');
        console.log(nextDay)
        var fiveDay = document.querySelector('.date'+i)
        console.log(fiveDay);
        fiveDay.textContent = nextDay;
        
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
        /*var fiveIcon = document.getElementById('.icon'+i)        
        `<img src="http://openweathermap.org/img/wn/${futureWeatherIcon}@2x.png" alt="weather icon" style="width:30px;height:30px;">`*/
    }
})}

function saveSearch(){
    console.log(city)
    city = city.toUpperCase();
    searchHistory.push(city);
    localStorage.setItem('saved searches', JSON.stringify(searchHistory))
}

function getHistory() {
    var clear = document.getElementById('buttons');
    while (clear.firstChild) {
      clear.removeChild(clear.firstChild);
    }
    searchHistory = JSON.parse(localStorage.getItem('saved searches'));
    if (searchHistory !== null) {
      for (i = 0; i < searchHistory.length; i++) {
        citiesSearched.append(
          `<button type="button" class="button btn btn-block btn-sm btn-primary">${searchHistory[i]}</button>`
        );
      }
    } else {
      searchHistory = [];
    }}

searchBtn.addEventListener('click', getLatLong())
citiesSearched.on('click', '.button', function () {
    $(this).html().innerhtml = document.getElementById('searchBar');
    console.log($(this).html())
    getLatLong();
  });


    
    

