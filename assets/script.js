//var apiKey = "e1a281f8f89d93ca28dcded0f11ad7e1";

var weatherContainer = document.querySelector("#weather-container");

var predictionContainer = document.querySelectorAll("#prediction-container");

var currentHeader = document.getElementById("current-header");

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

                // for (var i = 0; i < data.daily.length - 2; i++) {
                //     var  predTempLi = document.createElement("li");
                //     var predTemp = data.daily[i].temp
                //     predTempLi.setAttribute("class", "list-group-item");
                //     predTempLi.append(predTemp);
                //     predictionContainer[i].append(predTempLi);
                // }

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
            getWeather(data[0].lat, data[0].lon);
        });
};

var historyBtns = document.getElementById("history-buttons");

$("#search").click(function (event) {
    var searchInput = $("input").val();
    event.preventDefault();
    getCoords(searchInput);

    var titleLi = document.createElement("h3");
    var title = searchInput + "'s Current Weather";
    titleLi.append(title);
    currentHeader.append(titleLi);
    
    localStorage.setItem("search", searchInput);
})

var searched = localStorage.getItem("search");
console.log(searched);
// for (var i = 0; i < searched.length; i++) {
//     var historyBtn = document.createElement("button");
//     var buttontitle = searched.val().trim
// }