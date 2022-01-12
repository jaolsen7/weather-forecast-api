//var apiKey = "e1a281f8f89d93ca28dcded0f11ad7e1";
//var searchEl = document.querySelector("#searchInput");
//console.log(searchEl);

var weatherContainer = document.querySelector("#weather-container");

function getWeather(lat, lon) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat + "&lon=" +
        lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=e1a281f8f89d93ca28dcded0f11ad7e1";
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.current.weather[0].icon);
            console.log(data.current.weather[0].description);
            
            var icon = document.createElement("img");
            var iconUrl = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            icon.setAttribute("src", iconUrl);
            icon.setAttribute("alt", data.current.weather[0].description);
            weatherContainer.append(icon);
        }); 
    };

function getCoords(search) {
    var requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    search + "&limit=1&appid=e1a281f8f89d93ca28dcded0f11ad7e1";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0].lat);
            getWeather(data[0].lat, data[0].lon);
        });
};
getCoords("San Diego");
getCoords("Anchorage");

//document.querySelector("#search-btn").addEventListener("click", getCoords());
