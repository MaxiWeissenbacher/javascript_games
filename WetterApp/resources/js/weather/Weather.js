
//Stellt ein Wetter Objekt dar
class Weather{

    constructor(name, id, temperature, minTemp, maxTemp, humidity, pressure, windSpeed, weather){
        this.name = name;
        this.temperature = temperature;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windSpeed = windSpeed;
        this.id=id;
        this.weather = weather;
    }

    static fromObject(obj){
        return new Weather(obj.name, obj.id, obj.temperature, obj.minTemp, obj.maxTemp, obj.humidity, obj.windSpeed, obj.pressure, obj.weather);
    }

}

export default Weather;