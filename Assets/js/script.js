//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//try again in a couple hrs to see if API key is working
//var baseUrl = 'https://api.openweathermap.org/data/2.5/weather'


var APIKey = '3a1df45ecc477b266d4c9b728ee5cd1e'

var cityName = 'Atlanta' //update later to be what they enter into the form
/*
coord
coord.lon City geo location, longitude
coord.lat City geo location, latitude
*/

function getOneCallWeatherAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    var requestUrl = baseUrl + '?q=' + cityName + '&appid=' + APIKey;

    console.log("requestURL: "+ requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log("one call weather data next line")
            console.log(data);
        })


}

getOneCallWeatherAPI()

function getFiveDayForecastAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    var requestUrl = baseUrl + '?q=' + cityName + '&appid=' + APIKey;
    console.log("requestURL: " + requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Five day forcast data next line")
            console.log(data)
        })
}
getFiveDayForecastAPI();
/*
var searchBtn = document.querySelector('.search-btn')
var generatedCitiesUl = document.querySelector('.generated-cities-ul')


//var cityInput = document.querySelector("#input-city-name");
var cityName = "atlanta"
var savedCityArray = ["philly", "sandiego"] //cityInput.value;
//console.log(cityName)
var getSavedCityArray = []

function saveCities () {
    savedCityArray.push(cityName)
    console.log("SAV CIT ARR " + savedCityArray)
    localStorage.setItem("savedCityNameArray", JSON.stringify(savedCityArray));
}
function getSavedCities (){
    getSavedCityArray = JSON.parse(localStorage.getItem("savedCityNameArray")) || "";
    console.log("get cit arr: " + getSavedCityArray)
}

function generateCitiesList () {
    for (i=0; i< getSavedCityArray.length; i++) {
        var generatedCityLi = document.createElement('li');
        generatedCityLi.classList.add("generated-city-li")
        var generatedCityBtn = document.createElement('BUTTON');
        generatedCityBtn.classList.add("generated-city-btn");        
        generatedCityLi.appendChild(generatedCityBtn
        );
        generatedCityBtn.textContent = getSavedCityArray[i]  
        generatedCitiesUl.appendChild(generatedCityLi);
    }
}

searchBtn.addEventListener('click', function creatingCityLists (event){
    event.preventDefault //why is this not keeping the buttons from going away?
    saveCities()
    getSavedCities()
    generateCitiesList()
    return;
}
)
*/