import Weather from "../weather/Weather.js";
import Config from "./DBConfig.js"
import DBProvider from "./DBProvider.js";

let liveData = [];

function loadLiveDataFromStorage(){
    let jsonString = localStorage.getItem(Config.DB_NAME) || "[]",
        weatherObjects = JSON.parse(jsonString);
    liveData = [];
    for (let i = 0; i<weatherObjects.length; i++){
        liveData.push(Weather.fromObject(weatherObjects[i]));
    }
    console.log("Live data initialized with state from local storage")
}

function saveLiveDataToStorage(){
    let jsonString = JSON.stringify(liveData);
    localStorage.setItem(Config.DB_NAME, jsonString);
    console.log("Live data saved to local storage")
}

function storeWeather(weather){
    liveData.push(weather);
    saveLiveDataToStorage();
    console.log("Weather added to Db")
}

function updateWeatherInDB(weather){
    let oldWeather = findWeatherByID(weather.id);
    if(oldWeather){
        oldWeather.name = newData.name;
        oldWeather.temp = newData.name
    }
    saveLiveDataToStorage();
    return oldWeather;
}

function findWeatherByID(id){
    for (let i = 0; i< liveData.length; i++){
        if(liveData[i].id === id){
            return liveData[i];
        }
    }
    return undefined;
}

function removeWeatherFromDB(weather){
    let removedWeather;
    for(let i = 0; i <liveData.length; i++){
        if(liveData[i].id === weather){
            removedWeather = liveData.splice(i, 1)[0];
            saveLiveDataToStorage();
            break;
        }
    }
    return removedWeather;
}

class LocalStorageDBProvider extends DBProvider{
    async open(){
        loadLiveDataFromStorage();
    }

    async createWeather(weather){
        let newWeather = weather;
        storeWeather(newWeather);
        return newWeather
    }

    async getWeathers(){
        return liveData;
    }

    async updateWeather(weather){
        let updatedWeather = updateWeatherInDB(weather);
        return updatedWeather;
    }

    async removeWeather(weather){
        let removedWeather = removeWeatherFromDB(weather);
        return removedWeather;
    }
}

export default LocalStorageDBProvider;