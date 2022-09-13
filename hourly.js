
let hour = parseInt(today.getHours())


fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(obj => {
    for (i=0; i<6; i++){
        renderTemp(obj.hourly["temperature_2m"][hour], i)
        renderHour(hour, i)
        hour++
    }
})


function renderTemp(obj, i) {

    console.log(document.getElementsByClassName('list')[i])
    const hourTemp = document.getElementsByClassName('list')[i]
    hourTemp.textContent = `${obj}°`

}

function renderHour(hour, i) {

    console.log(document.getElementsByClassName('hourList')[i])
    const hourTemp = document.getElementsByClassName('hourList')[i]
    hourTemp.textContent = `${hour}:00`

}