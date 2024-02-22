$(document).ready(function () {
    var APIKey = "b2615b11df4332cf3ccba7715fe2730e";

    $("#btn").on("click", function () {
        // Get the value from the text input
        var city = $("#location").val();

        

        // Check if the city is not empty
        if (city.trim() === "") {
            alert("Please enter a city name.");
            return;
        }

        // Retrieve the existing search history from localStorage or create new array
        var searchHistory = JSON.parse(localStorage.getItem('Search History')) || [];

        // Add the new city to the search history array
        searchHistory.push(city);

        // Save the updated search history array back to localStorage
        localStorage.setItem('Search History', JSON.stringify(searchHistory));

        // API URL using the entered city
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&cnt=5`;

        // Use fetch to make the API request for current weather
        fetch(queryURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Handle current weather data
                var coordinates = data.coord;
                var temperature = data.main;
                var cityName = data.name;

                console.log(cityName);

                $(".weatherInfo").html("The City: " + cityName + " Latitude: " + coordinates.lat + ", Longitude: " + coordinates.lon + 
                " The temperature is: " + ((temperature.temp - 273.15) * 9/5 + 32).toFixed(2) + " &deg;F");
            });

        // Use fetch to make the API request for forecast
        fetch(forecastURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Handle forecast data
                var cityInfoList = $("#cityInfoList");
                cityInfoList.empty()

                data.list.forEach(function(forecastItem) {
                    var temperature = forecastItem.main.temp;
                    var humidity = forecastItem.main.humidity;
                    var time = forecastItem.dt_txt;
                    var windSpeed = forecastItem.wind.speed;

                    var listItem = $("<li>").html("Time: " + time + ", Temperature: " + ((temperature - 273.15) * 9/5 + 32).toFixed(2) + " &deg;F" + " Humidity: " + humidity + "%" + " Wind Speed: " + windSpeed);
                    cityInfoList.append(listItem);
                     
                });
            })
            .catch(function(error) {
                console.error('Error fetching forecast data:', error);
            });
    });
});
