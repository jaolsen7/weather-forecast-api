//var apiKey = "e1a281f8f89d93ca28dcded0f11ad7e1";

var weatherContainer = document.querySelector("#weather-container");

var predictionContainer = document.querySelectorAll(".prediction-container");

var currentHeader = document.getElementById("current-header");

var predictionHeader = document.querySelectorAll(".prediction-header");

function getWeather(lat, lon) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat + "&lon=" +
        lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=e1a281f8f89d93ca28dcded0f11ad7e1";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

                var unix = data.current.dt;
                var date = new Date(unix * 1000);
                var dateObject = "( " + date.toLocaleString() + " )";
                currentHeader.append(dateObject);

                var tempLi = document.createElement("li");
                var temp = "Temp: " + data.current.temp + " ºF";
                tempLi.append(temp);
                tempLi.setAttribute("class", "list-group-item");
                currentHeader.append(tempLi);

                var windLi = document.createElement("li");
                var wind = "Wind: " + data.current.wind_speed + " mph";
                windLi.append(wind);
                windLi.setAttribute("class", "list-group-item");
                currentHeader.append(windLi);

                var humidityLi = document.createElement("li");
                var humidity = "Humidity: " + data.current.humidity + " %";
                humidityLi.append(humidity);
                humidityLi.setAttribute("class", "list-group-item");
                currentHeader.append(humidityLi);

                var uviLi = document.createElement("li");
                var uvi = "UVI: " + data.current.uvi;
                uviLi.append(uvi);
                uviLi.setAttribute("class", "list-group-item");
                currentHeader.append(uviLi);

                var icon = document.createElement("img");
                var iconUrl = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
                icon.setAttribute("src", iconUrl);
                icon.setAttribute("alt", data.current.weather[0].description);
                weatherContainer.append(icon);

                for (var i = 0; i < 5; i++) {

                    var predUnix = data.daily[i].dt
                    var predDate = new Date(predUnix * 1000);
                    var dateObject = predDate.toLocaleString().split(",")[0];
                    predictionHeader[i].append(dateObject);

                    var pic = document.createElement("img");
                    var picUrl = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                    pic.setAttribute("src", picUrl);
                    pic.setAttribute("alt", data.daily[i].weather[0].description);
                    predictionContainer[i].append(pic);

                    var  predTempLi = document.createElement("li");
                    var predTemp = "Temp: " + data.daily[i].temp.day + " ºF";
                    predTempLi.setAttribute("class", "list-group-item");
                    predTempLi.append(predTemp);
                    predictionContainer[i].appendChild(predTempLi);

                    var  predWindLi = document.createElement("li");
                    var predWind = "Wind: " + data.daily[i].wind_speed + " mph";
                    predWindLi.setAttribute("class", "list-group-item");
                    predWindLi.append(predWind);
                    predictionContainer[i].appendChild(predWindLi);

                    var  predHumidityLi = document.createElement("li");
                    var predHumidity = "Humidity: " + data.daily[i].humidity + " %";
                    predHumidityLi.setAttribute("class", "list-group-item");
                    predHumidityLi.append(predHumidity);
                    predictionContainer[i].appendChild(predHumidityLi);
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
            getWeather(data[0].lat, data[0].lon);
        });
};

var pastSearches = [];
var historyBtns = document.getElementById("history-buttons");

historyBtns.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        var query = event.target.textContent;
        getCoords(query);
    }
})

$("#search").click(function (event) {
    var searchInput = $("input").val();
    event.preventDefault();
    getCoords(searchInput);

    var titleLi = document.createElement("h3");
    var title = searchInput + "'s Current Weather";
    titleLi.append(title);
    currentHeader.append(titleLi);
    
    pastSearches.push(searchInput);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));

    historyBtns.innerHTML = "";

    for (var i = 0; i < pastSearches.length; i++) {
        var historyBtn = document.createElement("button");
        historyBtn.setAttribute("class", "btn btn-outline-secondary btn-block");
        historyBtn.textContent = pastSearches[i];
        historyBtns.prepend(historyBtn);
    }
});

pastSearches = JSON.parse(localStorage.getItem("pastSearches"));
if (pastSearches === null ) {
        pastSearches = [];
}

    historyBtns.innerHTML = "";

    for (var i = 0; i < pastSearches.length; i++) {
        var historyBtn = document.createElement("button");
        historyBtn.setAttribute("class", "btn btn-outline-secondary btn-block");
        historyBtn.textContent = pastSearches[i];
        historyBtns.prepend(historyBtn);
    }