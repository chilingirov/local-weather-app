var latitude;
var longitude;
//Get longitude and latitute function
$(document).ready(function() {
    switcher = document.getElementById("switch");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = "lat=" + position.coords.latitude;
            longitude = 'lon=' + position.coords.longitude;
            getWeather(latitude, longitude);
        });
    } else {
        document.getElementById("main").innerHTML = "Geolocation is not supported by this browser.";
    }
});

//Weather icons object
var weatherIcons = {
        sun: '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>',
        cloudy: '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>',
        snow: '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>'
    }
    //Fetch data from the API using the latitude and the longitude from the previous function
function getWeather(latitude, longitude) {
    var urlString = 'https://api.openweathermap.org/data/2.5/weather?' + latitude + '&' + longitude + '&units=metric&APPID=9fefebd3089bcb338d7f8bbfeefd5870';
    $.ajax({
        url: urlString,
        dataType: "jsonp",
        success: function(response) {
            document.getElementById("location").innerHTML = response.name;
            document.getElementById("temperature").innerHTML = Math.round(response.main.temp) + '<span class="dgr">Degrees Celsius</span>';
            document.getElementById("description").innerHTML = response.weather[0].description;
            if (response.main.temp > 20) {
                document.getElementById("icon").innerHTML = weatherIcons.sun;
            } else if (response.main.temp < 20 && response.main.temp > 2) {
                document.getElementById("icon").innerHTML = weatherIcons.cloudy;
            } else if (response.main.temp < 2) {
                document.getElementById("icon").innerHTML = weatherIcons.snow;
            }
        }
    })
}
//Switch between celsius and fahrenheit
document.getElementById("switch").addEventListener("click", function(e) {
    e.preventDefault();
    var switcher = document.getElementById("switch");
    var degrees = document.getElementById("temperature");
    if (switcher.innerHTML == "Switch to Celsius") {
        switcher.innerHTML = "Switch to Fahrenheit";
        degrees.innerHTML = Math.round((parseInt(degrees.innerHTML) - 32) * 0.5556) + '<span class="dgr">Degrees Celsius</span>';
    } else if (switcher.innerHTML == "Switch to Fahrenheit") {
        switcher.innerHTML = "Switch to Celsius";
        degrees.innerHTML = Math.round(parseInt(degrees.innerHTML) * 1.8 + 32) + '<span class="dgr"> Degrees Fahrenheit </span>';

    }
});