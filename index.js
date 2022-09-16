let today = new Date();




if (today.getMinutes() >= 10) {
    currentTime = parseInt(`${today.getHours()}${today.getMinutes()}`);
  } else {
    currentTime = parseInt(`${today.getHours()}0${today.getMinutes()}`);
  }

if (currentTime>=0400 && currentTime<+1200) {
  document.querySelector('#greeting').textContent = "Good morning, gamer!"
} else if (currentTime>1200 && currentTime<=1900) {
  document.querySelector('#greeting').textContent = "Good afternoon."
} else if ((currentTime>1900 && currentTime<=2359)||currentTime<0400) {
  document.querySelector('#greeting').textContent = "Good evening."
}




const twoDaysFromNow = document.querySelector('#feThree')
twoDaysFromNow.textContent = `${today.getMonth() + 1}-${today.getDate()+2}`

const threeDaysFromNow = document.querySelector('#feFour')
threeDaysFromNow.textContent = `${today.getMonth() + 1}-${today.getDate()+3}`

const fourDaysFromNow = document.querySelector('#feFive')
fourDaysFromNow.textContent = `${today.getMonth() + 1}-${today.getDate()+4}`

const fiveDaysFromNow = document.querySelector('#feSix')
fiveDaysFromNow.textContent = `${today.getMonth() + 1}-${today.getDate()+5}`

const sixDaysFromNow = document.querySelector('#feSeven')
sixDaysFromNow.textContent = `${today.getMonth() + 1}-${today.getDate()+6}`


  const body = document.querySelector("body");

  const edgeDiv = document.querySelector("#lighten");

fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=38.8921&longitude=-77.0241&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
)
  .then((res) => res.json())
  .then((obj) => {
    let sunrise = parseInt(
      `${obj.daily.sunrise[0].slice(11, 13)}${obj.daily.sunrise[0].slice(
        14,
        16
      )}`
    );
    let sunset = parseInt(
      `${obj.daily.sunset[0].slice(11, 13)}${obj.daily.sunset[0].slice(
        14,
        16
      )}`
    );

    let isRaining =
      obj.hourly.precipitation[parseInt(today.getHours())] > 0.05;

    // currentTime = 1200
    // isRaining = false


    if (currentTime > sunrise && currentTime < sunset && isRaining) {
      body.style = "background-image: url(./weatherAppPhotos/RainNight.png)";
      backgroundCover.style =
        "background-image: url(./weatherAppPhotos/RainNight.png)";
      edgeDiv.style = "background-color: antiquewhite;";
    } else if (currentTime > sunrise && currentTime < sunset && !isRaining) {
      body.style = "background-image: url(./weatherAppPhotos/ClearDay.png)";
      backgroundCover.style =
        "background-image: url(./weatherAppPhotos/ClearDay.png)";
      edgeDiv.style = "background-color: antiquewhite;";
    } else if ((currentTime < sunrise || currentTime > sunset) && isRaining) {
      body.style =
        "background-image: url(./weatherAppPhotos/NightLightning.png)";
      backgroundCover.style =
        "background-image: url(./weatherAppPhotos/NightLightning.png)";
      edgeDiv.style = "background-color: black;";
    } else {
      body.style =
        "background-image: url(./weatherAppPhotos/ClearNightTwo.png)";
      backgroundCover.style =
        "background-image: url(./weatherAppPhotos/ClearNightTwo.png)";
      edgeDiv.style = "background-color: black;";
    }
  });




function currentAndForm() {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
  )
    .then((res) => res.json())
    .then((res) => {

      let today = new Date();

      function current() {
        if (today.getHours() >= 10) {
          hourlyTime = today.getHours();
        } else {
          hourlyTime = `0${today.getHours()}`;
        }

        if (today.getDate() >= 10) {
          currentDay = (today.getDate())
        } else { 
          currentDay = (`0${today.getDate()}`)
        }
        
        if (today.getMonth() + 1 >=10){
          currentMonth = (today.getMonth() + 1)
        } else {
          currentMonth = (`0${today.getMonth() + 1}`)
        }


        let format = `${today.getFullYear()}-${currentMonth}-${currentDay}T${hourlyTime}:00`;
        let spot = res.hourly.time.indexOf(format);
        console.log(format)

        let currTempF = results(spot).temp;
        let currTempC = `${((parseInt((currTempF))-32)/1.8).toFixed(1)}°C`
        let currTemp = currTempF;
        let selectCurrTemp = document.getElementById("currentTemp")
        selectCurrTemp.innerHTML = currTemp;

        let units = document.querySelector('#slider')
        units.addEventListener('click', () => {
            if (units.checked){ //ON
                selectCurrTemp.innerHTML = currTempC
            } else { //OFF
                selectCurrTemp.innerHTML = currTempF
            }

        })

        let currHumid = results(spot).humid;
        let selectCurrHumid = document.getElementById("currentHumid");
        selectCurrHumid.innerHTML = currHumid;

        let currRain = results(spot).rain;
        let selectCurrRain = document.getElementById("currentRain");
        selectCurrRain.innerHTML = currRain;

        let currWind = results(spot).wind;
        let selectCurrWind = document.getElementById("currentWind");
        selectCurrWind.innerHTML = currWind;

      }
      current();

      let submit = document.getElementById("submit");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();
        document.querySelector('#switchTwo').style = "visibility: visible"	
        let format = `${today.getFullYear()}-${currentMonth}-${
          parseInt(today.getDate()) + parseInt(day.value)
        }T${e.target.hour.value}`;

        let spot = res.hourly.time.indexOf(format);

        let currTempF = results(spot).temp;
        let currTempC = `${((parseInt((currTempF))-32)/1.8).toFixed(1)}°C`
        let currTemp = currTempF;
        let formTemp = document.getElementById("formTemp");
        formTemp.textContent = currTemp
        

        let units = document.querySelector('#slider2')
        units.addEventListener('click', () => {
            if (units.checked){ //ON
                formTemp.innerHTML = currTempC
            } else { //OFF
                formTemp.innerHTML = currTempF
            }

        })


        let formHumid = document.getElementById("formHumid");
        formHumid.textContent = results(spot).humid;
        let formRain = document.getElementById("formRain");
        formRain.textContent = results(spot).rain;
        let formWind = document.getElementById("formWind");
        formWind.textContent = results(spot).wind;
      });

      function results(indexNumber) {
        let anything = {
          temp: `${res.hourly.temperature_2m[indexNumber]}°F`,
          humid: `Humidity: ${res.hourly.relativehumidity_2m[indexNumber]}%`,
          rain:
            res.hourly.precipitation[indexNumber] > 0
              ? "It may rain at this time"
              : "It shouldn't rain at this time.",
          wind: `${res.hourly.windspeed_10m[indexNumber]} mph`,
        };
        return anything;
      }
    });
}

function hourlyFunction() {
  let hour = parseInt(today.getHours());

  function renderHourlyInitial() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`)
    .then((res) => res.json())
    .then((obj) => {
      
      renderTempAndHour(obj, hour)
      
    });
  }
  renderHourlyInitial()



  function renderTempAndHour(obj, hour) {
    for (i = 0; i < 6; i++) {
      renderTemp(obj.hourly["temperature_2m"][hour], i);
      renderHour(hour, i);
      hour++;
    }
  }

  function renderTemp(obj, i) {
    const hourTemp = document.getElementsByClassName("list")[i];

    if (obj.toString()[2] !== '.') {
      hourTemp.textContent = `${obj}.0°`;
    } else {
      hourTemp.textContent = `${obj}°`;
    }
  }

  function renderHour(hour, i) {
    const hourTemp = document.getElementsByClassName("hourList")[i];

    if (hour%24<10) {
      hourTemp.textContent = `0${hour%24}:00`;
    } else {
      hourTemp.textContent = `${hour%24}:00`;
    }

    
  }


  const nextSix = document.querySelector('#nextSix')
  nextSix.addEventListener('click', () => {
    fetchAndRenderHourlyPlus()
  })
  const lastSix = document.querySelector('#lastSix')
  lastSix.addEventListener('click', () => {
    fetchAndRenderHourlyMinus()
  })

  function fetchAndRenderHourlyPlus() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`)
    .then((res) => res.json())
    .then((obj) => {
      
      if (hour<=138) {
        renderTempAndHour(obj, hour+=6)
      } else {
        alert('Sorry, but you cannot go beyond this point.')
      }
    
      const whatDayTag = document.querySelector('#whatDay')
      if (Math.ceil(hour/24) === 1) {
        whatDayTag.textContent = 'Today'
      } else if (Math.ceil(hour/24) === 2) {
        whatDayTag.textContent = 'Tomorrow'
      } else {
        whatDayTag.textContent = `${today.getMonth() + 1}-${today.getDate()+Math.floor(hour/24)}`
      }
      
    });
  }

  function fetchAndRenderHourlyMinus() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`)
    .then((res) => res.json())
    .then((obj) => {

      if (hour>=6) {
        renderTempAndHour(obj, hour-=6)
      } else {
        alert('Sorry, but you cannot go beyond this point.')
      }

      const whatDayTag = document.querySelector('#whatDay')
      if (Math.ceil(hour/24) === 1) {
        whatDayTag.textContent = 'Today'
      } else if (Math.ceil(hour/24) === 2) {
        whatDayTag.textContent = 'Tomorrow'
      } else {
        whatDayTag.textContent = `${today.getMonth() + 1}-${today.getDate()+Math.floor(hour/24)}`
      }
      
      
    });
  }



}






function backgroundLoader() {
  if (today.getMinutes() >= 10) {
    currentTime = parseInt(`${today.getHours()}${today.getMinutes()}`);
  } else {
    currentTime = parseInt(`${today.getHours()}0${today.getMinutes()}`);
  }

  const body = document.querySelector("body");

  const edgeDiv = document.querySelector("#lighten");

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
  )
    .then((res) => res.json())
    .then((obj) => {
      let sunrise = parseInt(
        `${obj.daily.sunrise[0].slice(11, 13)}${obj.daily.sunrise[0].slice(
          14,
          16
        )}`
      );
      let sunset = parseInt(
        `${obj.daily.sunset[0].slice(11, 13)}${obj.daily.sunset[0].slice(
          14,
          16
        )}`
      );

      let isRaining =
        obj.hourly.precipitation[parseInt(today.getHours())] > 0.05;

      // currentTime = 0000
      // isRaining = false

      if (currentTime > sunrise && currentTime < sunset && isRaining) {
        body.style = "background-image: url(./weatherAppPhotos/RainNight.png)";
        backgroundCover.style =
          "background-image: url(./weatherAppPhotos/RainNight.png)";
        edgeDiv.style = "background-color: antiquewhite;";
      } else if (currentTime > sunrise && currentTime < sunset && !isRaining) {
        body.style = "background-image: url(./weatherAppPhotos/ClearDay.png)";
        backgroundCover.style =
          "background-image: url(./weatherAppPhotos/ClearDay.png)";
        edgeDiv.style = "background-color: antiquewhite;";
      } else if ((currentTime < sunrise || currentTime > sunset) && isRaining) {
        body.style =
          "background-image: url(./weatherAppPhotos/NightLightning.png)";
        backgroundCover.style =
          "background-image: url(./weatherAppPhotos/NightLightning.png)";
        edgeDiv.style = "background-color: black;";
      } else {
        body.style =
          "background-image: url(./weatherAppPhotos/ClearNightTwo.png)";
        backgroundCover.style =
          "background-image: url(./weatherAppPhotos/ClearNightTwo.png)";
        edgeDiv.style = "background-color: black;";
      }
    });
}







const cities = {
  newYork: [40.71, -74.01],
  washington: [38.8921, -77.0241],
  sacramento: [38.5737, -121.4871],
  losAngeles: [34.05, -118.24],
  chicago: [41.85, -87.65],
  houston: [29.76, -95.36],
  phoenix: [33.45, -112.07],
  philadelphia: [39.95, -75.16],
};

let lat = cities.newYork[0];
let long = cities.newYork[1];

const cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector('#switchTwo').style = "visibility: hidden"
  

//clear hourform

  let formTemp = document.getElementById("formTemp");
  formTemp.textContent = '';
  let formHumid = document.getElementById("formHumid");
  formHumid.textContent = '';
  let formRain = document.getElementById("formRain");
  formRain.textContent = '';
  let formWind = document.getElementById("formWind");
  formWind.textContent = '';

  lat = cities[e.target.city.value][0];
  long = cities[e.target.city.value][1];


  backgroundLoader()
  currentAndForm();
  hourlyFunction();
});

const citySubmitButton = document.querySelector('#citySubmit')
citySubmitButton.addEventListener('mouseover', e => {
  citySubmitButton.style['background-color'] = 'blue';
})
citySubmitButton.addEventListener('mouseleave', e => {
  citySubmitButton.style['background-color'] = '#9f9f9f';
})

const hourSubmit = document.querySelector('#hourSubmit')
hourSubmit.addEventListener('mouseover', e => {
  hourSubmit.style['background-color'] = 'blue';
})
hourSubmit.addEventListener('mouseleave', e => {
  hourSubmit.style['background-color'] = '#9f9f9f';
})

currentAndForm()
hourlyFunction()
backgroundLoader()

