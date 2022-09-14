

let today = new Date();




if (today.getMinutes() >= 10) {
    currentTime = parseInt(`${today.getHours()}${today.getMinutes()}`);
  } else {
    currentTime = parseInt(`${today.getHours()}0${today.getMinutes()}`);
  }

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
      //Required checkmarks:
      //Hourly:
      //Temperature, Relative Humidity, rain, Wind Speed (10)
      //Daily:
      //Max Temp, Min Temp, Sunrise, Sunset
      let today = new Date();

      function current() {
        if (today.getHours() >= 10) {
          hourlyTime = today.getHours();
        } else {
          hourlyTime = `0${today.getHours()}`;
        }


        let format = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}T${hourlyTime}:00`;
        console.log(format)
        let spot = res.hourly.time.indexOf(format);
        console.log(spot)
        

        let currTemp = results(spot).temp;
        let selectCurrTemp = document.getElementById("currentTemp");
        selectCurrTemp.innerHTML = currTemp;

        let currHumid = results(spot).humid;
        let selectCurrHumid = document.getElementById("currentHumid");
        selectCurrHumid.innerHTML = currHumid;

        let currRain = results(spot).rain;
        let selectCurrRain = document.getElementById("currentRain");
        selectCurrRain.innerHTML = currRain;

        let currWind = results(spot).wind;
        let selectCurrWind = document.getElementById("currentWind");
        selectCurrWind.innerHTML = currWind;
        // console.log(format);
        // console.log(spot);
      }
      current();

      //For the "next six hours" buttons, don't forget to limit generation to 23, spot + 1, +2, etc.
      // function addHours(){

      // }

      let submit = document.getElementById("submit");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();

        // console.log("hour selected:", e.target.hour.value);
        let format = `${today.getFullYear()}-0${today.getMonth() + 1}-${
          parseInt(today.getDate()) + parseInt(day.value)
        }T${e.target.hour.value}`;

        console.log(format)

        let spot = res.hourly.time.indexOf(format);

        console.log(spot)

        let formTemp = document.getElementById("formTemp");
        formTemp.textContent = results(spot).temp;
        let formHumid = document.getElementById("formHumid");
        formHumid.textContent = results(spot).humid;
        let formRain = document.getElementById("formRain");
        formRain.textContent = results(spot).rain;
        let formWind = document.getElementById("formWind");
        formWind.textContent = results(spot).wind;
      });

      function results(indexNumber) {
        // console.log(res.hourly.rain[indexNumber])
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

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
  )
    .then((res) => res.json())
    .then((obj) => {
      for (i = 0; i < 6; i++) {
        renderTemp(obj.hourly["temperature_2m"][hour], i);
        renderHour(hour, i);
        hour++;
      }
    });

  function renderTemp(obj, i) {
    // console.log(document.getElementsByClassName("list")[i]);
    const hourTemp = document.getElementsByClassName("list")[i];
    hourTemp.textContent = `${obj}°`;
  }

  function renderHour(hour, i) {
    // console.log(document.getElementsByClassName("hourList")[i]);
    const hourTemp = document.getElementsByClassName("hourList")[i];
    hourTemp.textContent = `${hour}:00`;
  }
}

function loadbackground() {
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
        body.style = "background-image: url(./weatherAppPhotos/RainDay.png)";
        backgroundCover.style =
          "background-image: url(./weatherAppPhotos/RainDay.png)";
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
  washington: [38.8921, -77.0241],
  newYork: [40.71, -74.01],
  sacramento: [38.5737, -121.4871],
  losAngeles: [34.05, -118.24],
  chicago: [41.85, -87.65],
  houston: [29.76, -95.36],
  phoenix: [33.45, -112.07],
  philadelphia: [39.95, -75.16],
};

let lat = cities.washington[0];
let long = cities.washington[1];

const cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

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

  currentAndForm();
  hourlyFunction();
});