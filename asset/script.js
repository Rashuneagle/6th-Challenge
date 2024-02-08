var APIKey = "b2615b11df4332cf3ccba7715fe2730e";
console.log(APIKey);

var lat = 44.34;
var lon = 10.99;

var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
console.log(queryURL);

console.log(fetch(queryURL));