fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(res => {
//Required checkmarks: 
//Hourly:
//Temperature, Relative Humidity, Rain, Wind Speed (10), Wind direction
//Daily:
//Max Temp, Min Temp, Sunrise, Sunset

class Search{
    constructor(hour,day,month,year){
        this.hour = hour
        this.day = day
        this.month = month
        this.year = year
    }
}

function newSearch(hour,day,month,year){
    let instance = new Search(hour,day,month,year)
    let format = `${instance.year}-${instance.month}-${instance.day}T${instance.hour}`
    let spot = res.hourly.time.indexOf(format)
    console.log(spot)
    results(spot)
}


function results(indexNumber){
let temp = `The temperature for that time is ${res.hourly.temperature_2m[indexNumber]} degrees Fahrenheit.`
let humid = `The relative humidity for that time is ${res.hourly.relativehumidity_2m[indexNumber]}%.`
let precipitation = (res.hourly.precipitation[indexNumber] > 0)? "It may rain at that time." : "It shouldn't rain at that time."
let wind = `The wind speed for that time is ${res.hourly.windspeed_10m[indexNumber]} mph.`

console.log(temp, humid, precipitation, wind)

}



newSearch("08:00", "14", "09", "2022") // As you can see here, inputting the information as required would give us a number

})