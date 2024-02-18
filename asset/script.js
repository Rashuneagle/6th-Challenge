


var APIKey = "b2615b11df4332cf3ccba7715fe2730e";
console.log(APIKey);
var city = $( "#location")

console.log(city)

var lat = 44.34;
var lon = 10.99;

var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
console.log(queryURL);
fetch(queryURL);

console.log(fetch(queryURL));

$("#btn").on("click", function() {
    alert("Button Clicked");
})