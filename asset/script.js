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

        // API URL using the entered city
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
        var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&cnt=5`;


        // Use fetch to make the API request
        fetch(queryURL)
            .then(function(response) {
                
                return response.json();
            })
            .then(function(data) {
                // Log the data to the console to inspect the structure
                console.log('API Response:', data);

                // Access the coordinates from the API response
                var coordinates = data.coord;
                // Access the weather temperature from the API response
                var temperature = data.main;

                var cityName = data.name;

                // Log the city name to the console to verify
                console.log(cityName);

                // Log the coordinates to the console to verify
                console.log('Coordinates:', coordinates);

                // Replace the content of the .weatherInfo section with the new data
                $(".weatherInfo").html("The City: " + cityName + " Latitude: " + coordinates.lat + ", Longitude: " + coordinates.lon + 
                " The temperature is: " + ((temperature.temp - 273.15) * 9/5 + 32).toFixed(2) + " &deg;F");
            })
        fetch(forecastURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data) {
                console.log('API Response: ', data);
            var cityList = data.list;
            console.log(cityList);



            var cityInfoList = $("#cityInfoList");

            data.list.forEach(function(forecastItem){

                var temperature = forecastItem.main.temp;
                var humidity = forecastItem.main.humidity;
                var time = forecastItem.dt_txt
                var windSpeed = forecastItem.wind.speed;
                var listItem = $("<li>").html("Time: " + time + ", Temperature: " + ((temperature - 273.15) * 9/5 + 32).toFixed(2) + " &deg;F" + " Humidity: " + humidity + "%" + "Wind Speed: " + windSpeed);
                cityInfoList.append(listItem); 
            })

            
    })



    .catch(function(error) {
        console.error('Error fetching data:', error);
    });

    localStorage.setItem('City Searched', city)

    });
});
