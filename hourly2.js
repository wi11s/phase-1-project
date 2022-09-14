
let hour = (today.getHours())


fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York')
.then(res => res.json())
.then(obj => {
    for (i=0; i<6; i++){
        
        renderTemp(obj.hourly["temperature_2m"][hour], i)
        
        renderHour(hour, i)
        
        hour++
        
    }



function renderTemp(obj, i) {

    //console.log(document.getElementsByClassName('list')[i])
    let hourTemp = document.getElementsByClassName('list')[i]
    hourTemp.textContent = `${obj}°`
    
    
    
}

function renderHour(hour, i) {

    //console.log(document.getElementsByClassName('hourList')[i])
    let hourTime = document.getElementsByClassName('hourList')[i]
    hourTime.textContent = `${hour}:00`
    
}

//I realize how extra this is, but the renderTemp and renderHour are looped through.
//So I'm gonna make 2 separate functions for previous and for future temps

//call these functions within the button events
function renderPastHours(hour, i){
    let hourTime = document.getElementsByClassName('hourList')[i]
    hourTime.textContent = `${hour}:00`
    
}


function backButton(){
    let lastSix = document.getElementById('lastSix')
    lastSix.addEventListener('click' , renderPastHours)
}
backButton()
})



//Add or subtract six from the numbers provided until a limit of 00:00 or 23:00 is reached