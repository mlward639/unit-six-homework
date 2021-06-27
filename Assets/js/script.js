//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var blankInputEl = document.querySelector("#input-city-name");
var searchBtn = document.querySelector('.search-btn')
var generatedCitiesUl = document.querySelector('.generated-cities-ul')

var APIKey = '3a1df45ecc477b266d4c9b728ee5cd1e'

var inputedCityName = '' //update later to be what they enter into the form

//var cityInput = document.querySelector("#input-city-name");
var savedCityArray = [] //cityInput.value;
//console.log(inputedCityName)
var getSavedCityArray = []
var combinedSavedCityArray
var error = new Error('Cannot search the same city twice');

/* ONE CALL HAS
CURRENT WEATHER, COORDs
coord
coord.lon City geo location, longitude
coord.lat City geo location, latitude
*/

function getInputValue () {
    inputedCityName = blankInputEl.value;
    console.log("inputctyname: " + inputedCityName)
    //look if in INCLUDES it matters if capital or lowercase. seems like a lot of work to capitalize just first letter of each word so wont do unless it matters for API search
    if (getSavedCityArray.includes(inputedCityName)) {
        //is it ok to use alert here?
        window.alert("Cannot search the same city twice");
        blankInputEl.value = ''; 
        throw error;
    }
} 

function getOneCallWeatherAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    var requestUrl = baseUrl + '?q=' + inputedCityName + '&appid=' + APIKey;
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

function getFiveDayForecastAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    var requestUrl = baseUrl + '?q=' + inputedCityName + '&appid=' + APIKey;
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

function saveCities () {
    savedCityArray.push(inputedCityName)
    if (getSavedCityArray.length > 0) {
        combinedSavedCityArray = savedCityArray.concat(getSavedCityArray)
        localStorage.setItem("savedCityNameArray", JSON.stringify(combinedSavedCityArray));
    } else {
        localStorage.setItem("savedCityNameArray", JSON.stringify(savedCityArray));
    }
}

//on page load, get all the saved cities from last search (saved to local storage) and make the buttons and perform API searches on them again
function getSavedCities (){
    getSavedCityArray = JSON.parse(localStorage.getItem("savedCityNameArray")) || "";
    console.log("get cit arr: " + getSavedCityArray)
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
    function getSavedOneCallWeatherAPI() {
        var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        for (i=0; i < getSavedCityArray.length; i++) {
            var requestUrl = baseUrl + '?q=' + getSavedCityArray[i] + '&appid=' + APIKey;
            console.log("requestURL: "+ requestUrl)
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("one call saved weather data for " + getSavedCityArray[i] + "next line")
                    console.log(data);
                })
            }
    }
getSavedOneCallWeatherAPI();

    function getSavedFiveDayForecastAPI() {
        var baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        for (i=0; i < getSavedCityArray.length; i++) {
            var requestUrl = baseUrl + '?q=' + getSavedCityArray[i] + '&appid=' + APIKey;
            console.log("requestURL: " + requestUrl);
            console.log(getSavedCityArray[i])
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("Five day forecast saved data for " + getSavedCityArray[i] + "next line")
                    console.log(data)
                })
        }
    }
getSavedFiveDayForecastAPI();

}

getSavedCities();

//add error message if the city returns no data
//figure out if capital vs lowercase matters for cities searched
//figure out of spaces between city names (like new york city) matters

function generateCitiesList () {
    generatedCityLi = document.createElement('li');
    generatedCityLi.classList.add("generated-city-li")
    generatedCityBtn = document.createElement('BUTTON');
    generatedCityBtn.classList.add("generated-city-btn");        
    generatedCityLi.appendChild(generatedCityBtn);
    generatedCityBtn.textContent = inputedCityName; 
    generatedCitiesUl.appendChild(generatedCityLi);
    }


searchBtn.addEventListener('click', function creatingCityLists (event){
    getInputValue();
    saveCities();
    generateCitiesList();
    getOneCallWeatherAPI()
    getFiveDayForecastAPI();
    blankInputEl.value = ''; 
    return;
}
)
