fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,rain,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(res => {
//Required checkmarks: 
//Hourly:
//Temperature, Relative Humidity, rain, Wind Speed (10)
//Daily:
//Max Temp, Min Temp, Sunrise, Sunset



function current(){
    let today = new Date()
    let format = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}T${today.getHours()}:00`
    let spot = res.hourly.time.indexOf(format)
    
    let currTemp = results(spot).temp 
    let selectCurrTemp = document.getElementById('currentTemp')
    selectCurrTemp.innerHTML = currTemp
    
    let currHumid = results(spot).humid
    let selectCurrHumid = document.getElementById('currentHumid')
    selectCurrHumid.innerHTML = currHumid

    let currRain = results(spot).rain
    let selectCurrRain = document.getElementById('currentRain')
    selectCurrRain.innerHTML = currRain

    let currWind = results(spot).wind
    let selectCurrWind = document.getElementById('currentWind')
    selectCurrWind.innerHTML = currWind


}
current()


//For the "next six hours" buttons, don't forget to limit generation to 23, spot + 1, +2, etc.
function addHours(){

}




function newSearch(hour, day){
let submit = document.getElementById('submit')
submit.addEventListener('submit', (e)=> {
    e.preventDefault()
    console.log(hour[e.target.hour.value].textContent)
    console.log(day[e.target.day.value].textContent)
    formFill(hour[e.target.hour.value].textContent, day[e.target.day.value].value)
})  
}
newSearch(hour, day)






function formFill(hour,day){
    let today = new Date()
    let format = `${today.getFullYear()}-0${today.getMonth()+1}-${parseInt(today.getDate()) + parseInt(day)}T${hour}`
    let spot = res.hourly.time.indexOf(format)
    let formTemp = document.getElementById('formTemp')
    formTemp.innerHTML = results(spot).temp
    let formHumid = document.getElementById('formHumid')
    formHumid = results(spot).humid
    let formRain = document.getElementById('formRain')
    formRain.innerHTML = results(spot).rain
    let formWind = document.getElementById('formWind')
    formWind.innerHTML = results(spot).wind

}


function results(indexNumber){
let anything = {
    temp: `${res.hourly.temperature_2m[indexNumber]}°F`,
    humid:`Humidity: ${res.hourly.relativehumidity_2m[indexNumber]}%`,
    rain: (res.hourly.rain[indexNumber] > 0)? "It may rain at this time" : "It shouldn't rain at this time.",
    wind: `${res.hourly.windspeed_10m[indexNumber]} mph`
}
return anything

}





 // As you can see here, inputting the information as required would give us a number

})



//Current day
//id = "currentDay"

//Hours (shows six at a time up to 24)
//button for next six id = nextSix
//button for previous six id = lastSix


//Background is later


//Form
//querySelector 'form'

//Form output
//id= "formOutput"