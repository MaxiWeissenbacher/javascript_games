import LocalStorageDBProvider from "./LocalStorageDBProvider.js";
import IndexedDBProvider from "./IndexedDBProvider.js";

function getProvider(strategy){
    switch(strategy){
        case DBConnector.LOCAL_STORAGE_STRATEGY:
            return new LocalStorageDBProvider();
        case DBConnector.INDEXED_DB_STRATEGY:
            return new IndexedDBProvider();
        default:
            throw new Error("Strategy");
    }
}

class DBConnector {

    constructor(strategy) {
        this.db = getProvider(strategy);
    }

    open() {
        return this.db.open();
    }

    createWeathers(weather) {
        let newWeather = weather;
        return this.db.createWeather(newWeather);
    }

    getWeathers(){
        return this.db.getWeathers();
    }

    updateWeather(weather){
        return this.db.updateWeather(weather);
    }

    removeWeather(weather) {
        return this.db.removeWeather(weather);
    }
}

DBConnector.INDEXED_DB_STRATEGY = Symbol("IndexedDB");
DBConnector.LOCAL_STORAGE_STRATEGY = Symbol("LocalStorage");

export default DBConnector;