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
var lat;
var lon;

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

function getCurrentWeatherAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    var requestUrl = baseUrl + '?q=' + inputedCityName + '&units=imperial&appid=' + APIKey;
    console.log("requestURL: "+ requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log("get current weather data next line")
            console.log(data);
            lat = data.coord.lat;
            console.log("lat : " + lat);  
            lon = data.coord.lon;
            console.log("lon: " + lon);
            function getOneCallWeatherAPI() {
                var baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';  
                var requestUrl = baseUrl + '?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + APIKey
                console.log("requestURL: " + requestUrl);
                fetch(requestUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log("OneCall data next line")
                        console.log(data)
                    })
            }

            getOneCallWeatherAPI();  
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
        generatedCityLi.classList.add("generated-city-li");
        var generatedCityBtn = document.createElement('BUTTON');
        generatedCityBtn.classList.add("generated-city-btn");        
        generatedCityLi.appendChild(generatedCityBtn);
        generatedCityBtn.textContent = getSavedCityArray[i];  
        generatedCitiesUl.appendChild(generatedCityLi);
        getSavedCurrentWeatherAPI()
    }
        function getSavedCurrentWeatherAPI() {
            var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
            var requestUrl = baseUrl + '?q=' + getSavedCityArray[i] + '&units=imperial&appid=' + APIKey;
            console.log("requestURL: "+ requestUrl);
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("get current weather saved data for " + getSavedCityArray[i] + " next line") //why is this saying the getSavedCityArray[i] is undefined in console log but still pulling data from right city...?
                    console.log(data);
                    lat = data.coord.lat;
                    console.log("lat : " + lat);  
                    lon = data.coord.lon;
                    console.log("lon: " + lon);
                    function getSavedOneCallWeatherAPI() {
                        var baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';  
                        var requestUrl = baseUrl + '?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + APIKey
                        console.log("requestURL: " + requestUrl);
                        console.log(getSavedCityArray[i]);
                        fetch(requestUrl)
                            .then(function (response) {
                            return response.json();
                            })
                            .then(function(data) {
                            console.log("OneCall saved data for " + getSavedCityArray[i] + "next line") //why is this saying the getSavedCityArray[i] is undefined in console log but still pulling data from right city...?
                            console.log(data)
                            })
                        } //end getOneCall fxn
                    getSavedOneCallWeatherAPI();
                }) //end then fxn data
    } //end get saved weather api fxn
}//end get saved cities fxn
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


//run these functions when clicking the search button
searchBtn.addEventListener('click', function creatingCityLists (event){
    getInputValue();
    saveCities();
    generateCitiesList();
    getCurrentWeatherAPI()
    blankInputEl.value = ''; 
    return;
}
)
