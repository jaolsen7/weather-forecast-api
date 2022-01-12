//var apiKey = "e1a281f8f89d93ca28dcded0f11ad7e1";

var weatherContainer = document.querySelector("#weather-container");
console.log(weatherContainer);

var predictionContainer = document.querySelectorAll("#prediction-container");
console.log(predictionContainer);

function getWeather(lat, lon) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat + "&lon=" +
        lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=e1a281f8f89d93ca28dcded0f11ad7e1";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.daily);
            console.log(data.current.weather[0].icon);
            console.log(data.current.weather[0].description);

                var icon = document.createElement("img");
                var iconUrl = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
                icon.setAttribute("src", iconUrl);
                icon.setAttribute("alt", data.current.weather[0].description);
                weatherContainer.append(icon);

                for (var i = 0; i < data.daily.length - 2; i++) {
                    var pic = document.createElement("img");
                    var picUrl = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                    pic.setAttribute("src", picUrl);
                    pic.setAttribute("alt", data.daily[i].weather[0].description);
                    predictionContainer[i].append(pic);
            }
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

$("#search").click(function (event) {
    var searchInput = $("input").val();
    event.preventDefault();
    getCoords(searchInput);
})
