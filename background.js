
let today = new Date()
console.log(today.getHours(), today.getMinutes())

fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(obj => renderBackground(obj))

let condition

function renderBackground(obj) {
    if (today.getHours() > obj.daily.sunrise[0] && today.getMinutes() === )
}

