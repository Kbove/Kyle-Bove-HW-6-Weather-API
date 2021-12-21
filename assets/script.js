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
const searchBtn = document.getElementById('search-button')
const APIkey = '211ebe8992749f44e55ed545dc0cf9a8';
const deleteBtn = document.getElementById('deleteBtn')

var currentTemp = document.querySelector('#current-temp')
var currentWind = document.querySelector('#current-wind')
var currentHumidity = document.querySelector('#current-humidity')
var currentUV = document.querySelector('#current-uv-index')
var currentCity = document.querySelector('#current-city');
var currentDate = document.getElementById('#current-date');
var currentIcon = document.querySelector('#current-icon');
var forecastData = document.querySelector('#forecast-container')

const dayOne = document.querySelector('#date1');
const dayTwo = document.querySelector('#date2');
const dayThree = document.querySelector('#date3');
const dayFour = document.querySelector('#date4');
const dayFive = document.querySelector('#date5');

var latitude;
var longitude;
var storedWeather = localStorage.getItem('weatherHistory');
console.log("history", storedWeather)
var citiesArray = []
console.log("cities array",citiesArray)

getSearchHistory()

function validCity() {
  userInput = document.getElementById('searchBar').value;
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + "&appid=d2ee20e2eb15e888df5d53206e353c5d";
  forecastData.setAttribute('style', 'display:show')

  fetch(url)
    .then(function (response) {
      console.log("checking response", response)
      if (response.ok) {
        getLatLong();
        saveSearch();
        return response.json();
      } else if (response === 404) {
        return Promise.reject('error 404')
      } else {
        return Promise.reject('some other error: ' + response.status)
      }
    }
    )
}

function getLatLong() {
  var city = document.getElementById('searchBar').value;
  checkURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=211ebe8992749f44e55ed545dc0cf9a8&units=imperial';

  fetch(checkURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data line 61', data)
      if (data.cod === '400') {
        alert('Please insert a city')

      } else {

        var weather = {

          'latitude': data.coord.lat,
          'longitude': data.coord.lon,
          'citySelected': data.name,
          'temp': data.main.temp,
          'wind': data.wind.speed,
          'humidity': data.main.humidity,
          'icon': data.weather[0].icon
        }
        citiesArray.push(weather.citySelected)
        console.log("city array", citiesArray)
        let dupeCheck = [...new Set(citiesArray)]
        var newHistory = dupeCheck.concat(storedWeather)
        console.log('new history', newHistory)
        localStorage.setItem("weatherHistory", newHistory)
        var newButton = document.createElement('button')
        var city = document.createTextNode(weather.citySelected)
        newButton.appendChild(city)
        newButton.setAttribute('class', `historyBtns`)
        newButton.setAttribute('style', ' align-items: stretch;justify-content: center;display:flex;background-color:white;color: black; border-radius: 5px;margin-top: 5px;margin-bottom: 10px;margin-left: -1px;margin-right: -1px;')
        var buttonList = document.querySelector('.search-container')
        buttonList.appendChild(newButton)
        getApi(weather);
      }
    })
}

function getApi(weather) {
  console.log('weather', weather)
  queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + weather.latitude + '&lon=' + weather.longitude + '&units=imperial&appid=211ebe8992749f44e55ed545dc0cf9a8&units=imperial'
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('dat in getApi function', data)
      var date = moment().format("MM/DD/YYYY");
      currentCity.textContent = (weather.citySelected) + " " + date;
      currentTemp.textContent = weather.temp;
      currentWind.textContent = weather.wind;
      currentHumidity.textContent = weather.humidity;
      currentUV.textContent = data.current.uvi;
      console.log('icon', weather.icon)
      currentIcon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.icon}@2x.png`)
      currentIcon.setAttribute('style', 'width:40px;height:40px;')


      console.log('data line 98', data)


      for (let i = 1; i < 6; i++) {
        var nextTemp = data.daily[i].temp.day
        console.log(nextTemp);
        var fiveTemp = document.querySelector('#temp' + i)
        console.log(fiveTemp)
        fiveTemp.textContent = nextTemp

        var nextWind = data.daily[i].wind_speed
        console.log(nextWind)
        var fiveWind = document.querySelector('#wind' + i)
        console.log(fiveWind)
        fiveWind.textContent = nextWind

        var nextHumidity = data.daily[i].humidity
        console.log(nextHumidity)
        var fiveHumidity = document.querySelector('#humidity' + i)
        console.log(fiveHumidity)
        fiveHumidity.textContent = nextHumidity

        var nextIcon = data.daily[i].weather[0].icon
        console.log("5 day icon", nextIcon)
        var fiveIcon = document.querySelector('#icon' + i)
        fiveIcon.setAttribute('src', `http://openweathermap.org/img/wn/${nextIcon}@2x.png`)
        fiveIcon.setAttribute('style', 'width:40px;height:40px;')


        var fiveDayObj = {
          'temps': nextTemp,
          'winds': nextWind,
          'humidities': nextHumidity,
          'icons': nextIcon
        }
      }
      getForecastDates(weather, fiveDayObj);
    })
}

function getForecastDates(weather, fiveDayObj) {
  var forecastSearch = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userInput + '&appid=211ebe8992749f44e55ed545dc0cf9a8';
  console.log("items", weather, fiveDayObj)
  fetch(forecastSearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("forecast", data);
      var callDay1 = data.list[7].dt_txt;
      var callDay2 = data.list[15].dt_txt;
      var callDay3 = data.list[23].dt_txt;
      var callDay4 = data.list[31].dt_txt;
      var callDay5 = data.list[39].dt_txt;
      console.log('five day', callDay3);

      var firstDay = moment(callDay1).format("MM-DD-YYYY")
      var secondDay = moment(callDay2).format("MM-DD-YYYY")
      var thirdDay = moment(callDay3).format("MM-DD-YYYY")
      var fourthDay = moment(callDay4).format("MM-DD-YYYY")
      var fifthDay = moment(callDay5).format("MM-DD-YYYY")

      dayOne.textContent = firstDay
      console.log("figuring out the dates", firstDay)
      dayTwo.textContent = secondDay
      dayThree.textContent = thirdDay
      dayFour.textContent = fourthDay
      dayFive.textContent = fifthDay
    })
}

function getSearchHistory() {
  var storedArray = storedWeather.split(',')
  console.log(storedArray)
  for (let i = 0; i < storedArray.length - 1; i++) {
    var newButton = document.createElement('button')
    var city = document.createTextNode(storedArray[i])
    newButton.appendChild(city)
    newButton.setAttribute('class', `historyBtns`)
    newButton.setAttribute('style', ' align-items: stretch;justify-content: center;display:flex;background-color:white;color: black; border-radius: 5px;margin-top: 5px;margin-bottom: 10px;margin-left: -1px;margin-right: -1px;')
    var buttonList = document.querySelector('.search-container')
    buttonList.appendChild(newButton)
  }
}

function deleteHistory() {
  localStorage.removeItem('weatherHistory')
  let history = document.querySelector('.search-container')
  console.log('trying to delete', history)
  var historyBtns = document.querySelectorAll(`.historyBtns`)
  console.log('successfully grabbed buttons', historyBtns)
  for (let i = 0; i < historyBtns.length; i++) {
    history.removeChild(historyBtns[i])
  }
}

deleteBtn.addEventListener('click', deleteHistory)

searchBtn.addEventListener('click', getLatLong)



    

