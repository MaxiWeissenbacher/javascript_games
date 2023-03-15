import Weather from "../weather/Weather.js"
import Config from "./DBConfig.js"
import DBProvider from "./DBProvider.js"

var database;

function getObjectStore(mode){
    let transaction = database.transaction([Config.DB_STORE_KEY], mode),
        objectStore = transaction.objectStore(Config.DB_STORE_KEY);
    return objectStore;
}

function callErrorCallback(msg, callback){
    let error = new Error(msg);
    callback(error);
}

function createDatabase(){
    return new Promise(function(resolve, reject){
        let request = indexedDB.open(Config.DB_NAME);
        request.onerror = callErrorCallback.bind(null, "Not able to open database", reject);
        request.onupgradeneeded = function(event) {
            let db = event.target.result,
                objectStore = db.createObjectStore(Config.DB_STORE_KEY, {
                    keyPath: Config.DB_STORE_KEY_PATH,
                });
            objectStore.createIndex("id", "id");
        };
        request.onsuccess = function(event) {
            database = event.target.result;
            resolve();
        };
    });
}

function storeWeather(weather){
    return new Promise(function(resolve, reject) {
        let objectStore = getObjectStore("readwrite");
        let request = objectStore.add(weather);
        request.onerror = callErrorCallback.bind(null,
            "Could not store weather in database", reject);
        request.onsuccess = function() {
            resolve(weather);
        };
    });
}

function getAllWeatherFromDatabase(){
    return new Promise(function(resolve, reject) {
        let objectStore = getObjectStore("readonly"),
            request = objectStore.getAll();
        request.onerror = callErrorCallback.bind(null,
            "Could not get weather from database", reject);
        request.onsuccess = function(event) {
            let dbWeather = event.target.result,
                weathers = [];
            for (let i = 0; i < dbWeather.length; i++) {
                weathers.push(Weather.fromObject(dbWeather[i]));
            }
            resolve(weathers);
        };
    });
}

function updateWeatherInDatabase(weather){
    return new Promise(function(resolve, reject) {
        let objectStore = getObjectStore("readwrite"),
            request = objectStore.get(weather.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not get weather from database", reject);
        request.onsuccess = function(event) {
            let updateRequest, dbWeather = event.target.result;
            dbWeather.name = weather.name;
            dbWeather.temp = weather.temp;
            updateRequest = objectStore.put(dbWeather);
            updateRequest.onerror = callErrorCallback.bind(null,
                "Could not update weather in database", reject);
            updateRequest.onsuccess = function() {
                let newWeather = Weather.fromObject(dbWeather);
                resolve(newWeather);
            };
        };
    });
}

function removeWeatherFromDatabase(weather){
    return new Promise(function(resolve, reject) {
        let transaction = database.transaction([Config.DB_STORE_KEY],
                "readwrite"),
            objectStore = transaction.objectStore(Config.DB_STORE_KEY),
            request = objectStore.delete(weather.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not remove weather from database", reject);
        request.onsuccess = function() {
            resolve(weather);
        };
    });
}


class IndexedDBManager extends DBProvider {

    async open() {
        return createDatabase();
    }

    async createWeather(weather) {
        let newWeather = weather;
        return storeWeather(newWeather);
    }

    async getWeathers() {
        return getAllWeatherFromDatabase();
    }

    async updateWheater(weather) {
        return updateWeatherInDatabase(weather);
    }

    async removeWeather(weather) {
        return removeWeatherFromDatabase(weather);
    }

}

export default IndexedDBManager;