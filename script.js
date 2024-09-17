/* go to google and go to  openweather > go to API menu and select current weather data */
// copy that http and pastehttps://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} 
const apikey = "69cd2dfbba0ad67ce4b04b4a23e3416e";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

async function checkWeather(city) {
    if (!city) {
        errorDiv.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data.main || !data.weather || !data.wind) {
            throw new Error("Incomplete data received from API.");
        }

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherMain = data.weather[0].main;
        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "Humidity") {
            weatherIcon.src = "images/humidity.png";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else {
            weatherIcon.src = "images/mist.png";
        }

        errorDiv.innerHTML = "";  
    } catch (error) {
        console.error('Invaild City Name:', error);
        errorDiv.innerHTML = "Invaild City Name : " + error.message;
        document.querySelector(".city").innerHTML = "City";
        document.querySelector(".temperature").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "--km/h";
        
    }
    document.querySelector(".weather").style.display = "block";
}