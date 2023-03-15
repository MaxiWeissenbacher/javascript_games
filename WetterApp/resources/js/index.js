/* eslint-env browser */

import OpenWeatherApiClient from "./api/OpenWeatherApiClient.js";
import Config from "./utils/Config.js";
import WeatherList from "./weather/WeatherList.js";
import DBConnector from "./db/DBConnector.js";
import Weather from "./weather/Weather.js";

 var db, 
    weatherList,
    inputValue,
    error;

 const urlStart = OpenWeatherApiClient.FETCH_CURRENT_WEATHER_URL,
         apiKey = OpenWeatherApiClient.API_KEY;

function init() {
    initDatabase().catch(function(error) {
        console.log(error);
    });
    fetchApi();
}

//Hier wird die Datenbank initialisiert
function initDatabase(){
    db = new DBConnector(DBConnector.INDEXED_DB_STRATEGY);
    return new Promise(function(resolve, reject) {
        db.open(true).then(function() {
            db.getWeathers().then(function(result) {
                initView(result);
                resolve(result);
            });
        }).catch(function(error) {
            reject(error);
        });
    });
}

//Initialisierung der Widget-Ansicht
function initView(weathers){
    let weatherListEl = document.querySelector(".widgets");
    weatherList = new WeatherList(weatherListEl);
    for (let i = 0; i< weathers.length; i++){
        console.log(weathers[i]);
        weatherList.add(weathers[i]);
        let btn = document.getElementById(weathers[i].id).getElementsByClassName("delete")[0],
            refreshButton = document.getElementById(weathers[i].id).getElementsByClassName("update")[0];
        // eslint-disable-next-line no-loop-func
        btn.addEventListener("click", function(){
            db.removeWeather(weathers[i]).then(weatherList.remove(weathers[i]));
        });
        // eslint-disable-next-line no-loop-func
        refreshButton.addEventListener("click", function() {
            fetch(urlStart + weathers[i].name + apiKey)
                .then(response => response.json())
                .then(data => {
                    let newWeather = createNewWeather(data);
                    db.removeWeather(weathers[i]).then(weatherList.remove(weathers[i]));
                    db.createWeathers(newWeather).then(weatherList.add(weathers[i]));
            });
        });
    }
}

function fetchApi() {
    inputValue = document.querySelector(".inputValue");
    document.querySelector(".inputValue").addEventListener("keypress", function (enter) {
        if (enter.key === "Enter") {
            // get the URL with the inputValue, which represents the city, and the right API-Key
            fetch(urlStart + inputValue.value + apiKey)
                .then(response => response.json())
                .then(data => {
                    let newWeather = createNewWeather(data);
                    db.createWeathers(newWeather).then(weatherList.add.bind(weatherList));
                    inputValue.value = "";  
                    location.reload();
                })
                .catch(() => {
                    errorAnimation();
                    inputValue.value = "";
                });
        }
        
    });
}

//Erstellt ein Neues Wetter Objekt aus den Api Daten
function createNewWeather(data){
    let weatherNew = new Weather(data["name"], Date.now().toString(), " - " + (data["main"]["temp"]-Config.KELVIN_TO_CELSIUS).toFixed(1) + " Grad", (data["main"]["temp_min"]-Config.KELVIN_TO_CELSIUS).toFixed(1), (data["main"]["temp_max"]-Config.KELVIN_TO_CELSIUS).toFixed(1), data["main"]["humidity"], data["main"]["pressure"], data["wind"]["speed"], data["weather"]);
    return weatherNew;
}

function errorAnimation() {
    error = document.querySelector(".widget");
    error.classList.add("show-error-animation");
    setTimeout(function() {
        //remove the class so animation can occur as many times as user triggers event, delay must be longer than the animation duration and any delay.
        error.classList.remove("show-error-animation");
      }, Config.ONE_SECOND);
}

init();