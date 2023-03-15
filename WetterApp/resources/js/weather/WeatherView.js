//Sorgt dafür, dass die Widgets richtig angeziegt werden und mit den richtigen Werten befüllt werden.

import { Event, Observable } from "../utils/Observable.js";

const WEATHER_VIEW_TEMPLATE_STRING = document.querySelector("#weather-widget-template").innerHTML
    .trim();

    class WeatherView extends Observable{

        constructor(weather){
            super();
            this.weather = weather;
            this.el = WeatherView.createWeatherElement(weather);
            this.windView = this.el.getElementsByClassName("wind")[0].getElementsByClassName("value")[0];
            this.windView.innerHTML = this.weather.windSpeed;
            this.nameView = this.el.getElementsByClassName("main")[0];
            this.nameView.innerHTML = this.weather.name + this.weather.temperature;
            this.minTempView = this.el.getElementsByClassName("min-temperature")[0].getElementsByClassName("value")[0];
            this.minTempView.innerHTML = this.weather.minTemp;
            this.maxTempView = this.el.getElementsByClassName("max-temperature")[0].getElementsByClassName("value")[0];
            this.maxTempView.innerHTML = this.weather.maxTemp;
            this.humidityView = this.el.getElementsByClassName("humidity")[0].getElementsByClassName("value")[0];
            this.humidityView.innerHTML = this.weather.humidity;
            this.pressureView = this.el.getElementsByClassName("pressure")[0].getElementsByClassName("value")[0];
            this.pressureView.innerHTML = this.weather.pressure;
            this.icon = this.el.getElementsByClassName("icon")[0].getElementsByTagName("img")[0];
            this.icon.src = "http://openweathermap.org/img/wn/" + this.weather.weather[0].icon + "@2x.png";
        }

        getElement(){
            return this.el;
        }

        getDelButton(){
            return this.delButton;
        }

        removeElement(){
            this.el.parentElement.removeChild(this.el);
        }

        getWeather(){
            return this.weather;
        }

        static createWeatherElement(weather){
            let el = document.createElement("div");
            el.setAttribute("id", weather.id);
            el.innerHTML = WEATHER_VIEW_TEMPLATE_STRING;
            return el;
        }

    }

    export default WeatherView;