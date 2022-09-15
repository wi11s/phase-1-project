let today = new Date()
if (today.getMinutes() >= 10) {
    currentTime = `${today.getHours()}${today.getMinutes()}`
} else {
    currentTime = `${today.getHours()}0${today.getMinutes()}`
}
const body = document.querySelector('body')
// parseInt(today.getHours())
fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(obj => {
    let sunrise = `${obj.daily.sunrise[0].slice(11, 13)}${obj.daily.sunrise[0].slice(14, 16)}`
    let sunset = `${obj.daily.sunset[0].slice(11, 13)}${obj.daily.sunset[0].slice(14, 16)}`
    let isRaining = obj.hourly.precipitation[parseInt(today.getHours())]>0.05
    


    if (currentTime>sunrise && currentTime<sunset) {
    if (currentTime>sunrise && currentTime<sunset && isRaining) {
        body.style = 'background-image: url(./weatherAppPhotos/RainDay.png)'
    } else if (currentTime>sunrise && currentTime<sunset && !isRaining) {
        body.style = 'background-image: url(./weatherAppPhotos/SunnyDay.png)'
    } else if (currentTime<sunrise || currentTime>sunset && isRaining) {
        body.style = 'background-image: url(./weatherAppPhotos/RainNightTwo.png)'
    } else {
        body.style = 'background-image: url(./weatherAppPhotos/ClearNightTwo.png)'
    }
    }})