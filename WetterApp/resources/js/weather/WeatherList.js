//Diese Datei beschäftigt sicht mit der korrekten Darstellung der Widget-Liste

import WeatherView from "../weather/WeatherView.js";
import {Observable} from "../utils/Observable.js";

var weatherList = [],
    weatherViews = [];

function addWeather(weather){
    let view = new WeatherView(weather);
    weatherViews.push(view);
    weatherList.appendChild(view.getElement());
}

function removeWeather(weather){
    for(let i = 0; i < weatherViews.length; i++){
        let curreentView = weatherViews[i];
        if(curreentView.getWeather().id === weather.id){
            curreentView.removeElement();
            weatherViews.splice(i, 1);
            break;
        }
    }
}

class WeatherList extends Observable{

    constructor(weatherListEl){
        super();
        weatherList = weatherListEl;
    }

    add(weather){
        addWeather(weather);
    }

    remove(weather){
        removeWeather(weather);
    }

}

export default WeatherList;