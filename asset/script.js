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

                // Log the coordinates to the console to verify
                console.log('Coordinates:', coordinates);

                // Replace the content of the .weatherInfo section with the new data
                $(".weatherInfo").html("Latitude: " + coordinates.lat + ", Longitude: " + coordinates.lon + 
                " The temperature is: " + ((temperature.temp - 273.15) * 9/5 + 32).toFixed(2) + " &deg;F");
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
    });
});
