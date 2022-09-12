fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(obj => {
    for (i=0; i<=24; i++){
        renderTemp(obj.hourly["temperature_2m"][i], i)
    }
})


function renderTemp(hour, i) {
    const hrLst = document.createElement('ul')
    const hourTemp = document.createElement('li')
    hourTemp.textContent = `${i}:00  |  ${hour}F`

    const hourlyTempDiv = document.querySelector('#temp')

    hrLst.append(hourTemp)
    hourlyTempDiv.append(hrLst)
}
