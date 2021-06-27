//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var blankInputEl = document.querySelector("#input-city-name");
var searchBtn = document.querySelector('.search-btn')
var generatedCitiesUl = document.querySelector('.generated-cities-ul')
var currentCityH2 = document.querySelector('.current-city-name')
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUVI = document.querySelector('.current-UVI')
var weatherIconGoesHere = document.querySelector(".current-city-name")
var weatherIcon = document.createElement('img')
var UVIBtn = document.createElement("BUTTON")

var dayOne = document.querySelector(".day1");
var dayOneTitle = document.querySelector(".day1-title");
var weatherIconCard1 = document.querySelector(".weather-icon-card1")
var dayOneTemp = document.querySelector('.temp-day1');
var dayOneWind = document.querySelector(".wind-day1");
var dayOneHumidity = document.querySelector(".humidity-day1");

var dayTwo = document.querySelector(".day2");
var weatherIconCard2 = document.querySelector(".weather-icon-card2")
var dayTwoTitle = document.querySelector(".day2-title");
var dayTwoTemp = document.querySelector('.temp-day2');
var dayTwoWind = document.querySelector(".wind-day2");
var dayTwoHumidity = document.querySelector(".humidity-day2");

var dayThree = document.querySelector(".day3");
var weatherIconCard3 = document.querySelector(".weather-icon-card3")
var dayThreeTitle = document.querySelector(".day3-title");
var dayThreeTemp = document.querySelector('.temp-day3');
var dayThreeWind = document.querySelector(".wind-day3");
var dayThreeHumidity = document.querySelector(".humidity-day3");

var dayFour = document.querySelector(".day4");
var weatherIconCard4 = document.querySelector(".weather-icon-card4")
var dayFourTitle = document.querySelector(".day4-title");
var dayFourTemp = document.querySelector('.temp-day4');
var dayFourWind = document.querySelector(".wind-day4");
var dayFourHumidity = document.querySelector(".humidity-day4");

var dayFive = document.querySelector(".day5");
var weatherIconCard5 = document.querySelector(".weather-icon-card5")
var dayFiveTitle = document.querySelector(".day5-title");
var dayFiveTemp = document.querySelector('.temp-day5');
var dayFiveWind = document.querySelector(".wind-day5");
var dayFiveHumidity = document.querySelector(".humidity-day5");



//for moving weather from current to one of the 5 cards, see if you can reassign the class from the current container to the card to move that information down...
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
 
var today = moment().format("MM/DD/YY");


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
            console.log("icon " + data.weather[0].icon)
            if (data.weather[0].icon == "01n" || "04n") {
                console.log("Weather icon if stmt is working") //YES so its an issue attaching source...
                weatherIcon.src="Assets/images/01d.png" //why wont it link to my picture??? says 404 not found for the image
                //now it has the same icon 01n but still not meeting the criteria to generate img
                weatherIconGoesHere.appendChild(weatherIcon);
            }  
            currentCityH2.textContent = inputedCityName + " (" + today + ")";
            weatherIconCurrent = document.createElement('img');
            console.log("temp: " + data.main.temp);
            currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0 F";
            console.log("wind: " + data.wind.speed);
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            console.log("humidity: " + data.main.humidity);
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
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
                        UVIBtn.textContent = data.current.uvi //make sure it is matching the unique UVI of each city when generated each time and not duplicating button
                        currentUVI.appendChild(UVIBtn);
                        console.log("UV index: " + data.current.uvi);
                        if (data.current.uvi < 3) {
                            UVIBtn.style.backgroundColor = "green";
                        } else if (data.current.uvi < 6) {
                            UVIBtn.style.backgroundColor = "yellow";
                        } else if (data.current.uvi < 8) {
                            UVIBtn.style.backgroundColor = "orange";
                        } else if (data.current.uvi < 11) {
                            UVIBtn.style.backgroundColor = "red";
                        } else if (data.current.uvi >= 11) {
                            UVIBtn.style.backgroundColor = "purple";
                        }
                        //day one card
                        dayOneTitle.textContent = moment().add(1, 'days').format("MM/DD/YY"); 
                        console.log("day1 icon " + data.daily[1].weather[0].icon) //figure out
                        console.log("day1 temp " + data.daily[1].temp.day) 
                        dayOneTemp.textContent = "Temp: " + data.daily[1].temp.day + "\u00B0 F";
                        console.log("day1 wind: " + data.daily[1].wind_speed);
                        dayOneWind.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
                        console.log("humidity day one: " + data.daily[1].humidity);
                        dayOneHumidity.textContent = "Humidity: " + data.daily[1].humidity + "%";
                        //day two card
                        dayTwoTitle.textContent = moment().add(2, 'days').format("MM/DD/YY"); 
                        console.log("day2 icon " + data.daily[2].weather[0].icon) //figure out
                        console.log("day2 temp " + data.daily[2].temp.day) 
                        dayTwoTemp.textContent = "Temp: " + data.daily[2].temp.day + "\u00B0 F";
                        console.log("day2 wind: " + data.daily[2].wind_speed);
                        dayTwoWind.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
                        console.log("humidity day2: " + data.daily[2].humidity);
                        dayTwoHumidity.textContent = "Humidity: " + data.daily[2].humidity + "%";
                        //day three card
                        dayThreeTitle.textContent = moment().add(3, 'days').format("MM/DD/YY"); 
                        console.log("day3 icon " + data.daily[3].weather[0].icon) //figure out
                        console.log("day3 temp " + data.daily[3].temp.day) 
                        dayThreeTemp.textContent = "Temp: " + data.daily[3].temp.day + "\u00B0 F";
                        console.log("day3 wind: " + data.daily[3].wind_speed);
                        dayThreeWind.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
                        console.log("humidity day 3: " + data.daily[3].humidity);
                        dayThreeHumidity.textContent = "Humidity: " + data.daily[3].humidity + "%";
                        //day four card
                        dayFourTitle.textContent = moment().add(4, 'days').format("MM/DD/YY"); 
                        console.log("day4 icon " + data.daily[4].weather[0].icon) //figure out
                        console.log("day4 temp " + data.daily[4].temp.day) 
                        dayFourTemp.textContent = "Temp: " + data.daily[4].temp.day + "\u00B0 F";
                        console.log("day4 wind: " + data.daily[4].wind_speed);
                        dayFourWind.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
                        console.log("humidity day 4: " + data.daily[4].humidity);
                        dayFourHumidity.textContent = "Humidity: " + data.daily[4].humidity + "%";                        
                        //day five card
                        dayFiveTitle.textContent = moment().add(5, 'days').format("MM/DD/YY"); 
                        console.log("day5 icon " + data.daily[5].weather[0].icon) //figure out
                        console.log("day5 temp " + data.daily[5].temp.day) 
                        dayFiveTemp.textContent = "Temp: " + data.daily[5].temp.day + "\u00B0 F";
                        console.log("day5 wind: " + data.daily[5].wind_speed);
                        dayThreeWind.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
                        console.log("humidity day 5: " + data.daily[5].humidity);
                        dayFiveHumidity.textContent = "Humidity: " + data.daily[5].humidity + "%";
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
    for (i=0; i < getSavedCityArray.length; i++) {
        var cityBtn, i = generatedCityBtn;
        console.log("trying to delineate city names/buttons to target specififically: " + cityBtn, i)
    }
    }



/* look at this when chaning between city to city; or look at searching the button text as the city when clicking the button so it re-searches it as the city... but without creating a new button...
function redistribute () {
    //move current to card one
    //add weather icon once its working
    if (generateCitiesList.length > 1) {
        dayOneTitle.append(currentCityH2) }
    // Move the paragraph from #myDiv1 to #myDiv2
  //$('#myDiv2').append( $('#myDiv1>p') );
}
     currentCityH2.textContent = inputedCityName + " (" + today + ")";
    weatherIconCurrent = document.createElement('img');
    console.log("temp: " + data.main.temp);
    currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0 F";
    console.log("wind: " + data.wind.speed);
    currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
    console.log("humidity: " + data.main.humidity);
    currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
} */

//run these functions when clicking the search button
searchBtn.addEventListener('click', function creatingCityLists (event){
    getInputValue();
    saveCities();
    generateCitiesList();
    getCurrentWeatherAPI();
    blankInputEl.value = ''; 
    return;
}
)
