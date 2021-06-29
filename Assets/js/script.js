//Setting variables, mostly Query selectors
var blankInputEl = document.querySelector("#input-city-name");
var searchBtn = document.querySelector('.search-btn')
var generatedCitiesUl = document.querySelector('.generated-cities-ul')
var currentCityH2 = document.querySelector('.current-city-name')
var weatherIconCard0 = document.querySelector('weather-icon-current')
var currentTemp = document.querySelector('.current-temp');
var currentWind = document.querySelector('.current-wind');
var currentHumidity = document.querySelector('.current-humidity');
var currentUVI = document.querySelector('.current-UVI')
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

var weatherIconArray = [weatherIconCard0, weatherIconCard1, weatherIconCard2, weatherIconCard3, weatherIconCard4, weatherIconCard5];
var cityTitleArray = [currentCityH2, dayOneTitle, dayTwoTitle, dayThreeTitle, dayFourTitle, dayFiveTitle];

var APIKey = '3a1df45ecc477b266d4c9b728ee5cd1e'

var inputedCityName = ''  

var savedCityArray = []  
var getSavedCityArray = []
var combinedSavedCityArray
var error1 = new Error('Cannot search the same city twice');
var error2 = new Error('No value entered for city name');
var error3 = new Error('City name not found'); //*********** */
var lat;
var lon;
 
var today = moment().format("MM/DD/YY");

var generatedCityBtn;

//functions

//input value set to the city name. error messages if duplicates or empty 
function getInputValue () {
    inputedCityName = blankInputEl.value;
    console.log("inputctyname: " + inputedCityName)
    if (getSavedCityArray.includes(inputedCityName)) {
        window.alert("Cannot search the same city twice");
        blankInputEl.value = ''; 
        throw error;
    }
    if (!inputedCityName) {
        window.alert("Cannot leave blank. Must enter a city.");
        blankInputEl.value = ''; 
        throw error;
    }
} 

//create unique URL to run through both weatherAPIs to obtain weather information & then display that to the page
function getCurrentWeatherAPI() {
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    var requestUrl = baseUrl + '?q=' + inputedCityName + '&units=imperial&appid=' + APIKey;
    console.log("requestURL: "+ requestUrl)
    console.log(inputedCityName, "jfkdjfkdsjf;")
    fetch(requestUrl)
        .then(function (response) {
            /* trying to throw error if the entered city is not found
            if (!response == 200) {
                //is it ok to use alert here?
                window.alert("ERROR");
                throw error;
            } ************************ */ 
            return response.json();
        })
        .then(function(data) {
            console.log("get current weather data next line")
            console.log(data);
            lat = data.coord.lat;
            //console.log("lat : " + lat);  
            lon = data.coord.lon;
            //console.log("lon: " + lon);
            //console.log("icon " + data.weather[0].icon) 
            currentCityH2.textContent = inputedCityName + " (" + today + ")";
            //console.log("temp: " + data.main.temp);
            currentTemp.textContent = "Temp: " + data.main.temp + "\u00B0 F";
            //console.log("wind: " + data.wind.speed);
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            //console.log("humidity: " + data.main.humidity);
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
                        //creating button with the UVI value displayed and setting color based on the value
                        UVIBtn.textContent = data.current.uvi  
                        currentUVI.appendChild(UVIBtn);
                        //console.log("UV index: " + data.current.uvi);
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
                        //console.log("day1 icon " + data.daily[1].weather[0].icon) //figure out
                        //console.log("day1 temp " + data.daily[1].temp.day) 
                        dayOneTemp.textContent = "Temp: " + data.daily[1].temp.day + "\u00B0 F";
                        //console.log("day1 wind: " + data.daily[1].wind_speed);
                        dayOneWind.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
                        //console.log("humidity day one: " + data.daily[1].humidity);
                        dayOneHumidity.textContent = "Humidity: " + data.daily[1].humidity + "%";
                        //day two card
                        dayTwoTitle.textContent = moment().add(2, 'days').format("MM/DD/YY"); 
                        //console.log("day2 icon " + data.daily[2].weather[0].icon) //figure out
                        //console.log("day2 temp " + data.daily[2].temp.day) 
                        dayTwoTemp.textContent = "Temp: " + data.daily[2].temp.day + "\u00B0 F";
                        //console.log("day2 wind: " + data.daily[2].wind_speed);
                        dayTwoWind.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
                        //console.log("humidity day2: " + data.daily[2].humidity);
                        dayTwoHumidity.textContent = "Humidity: " + data.daily[2].humidity + "%";
                        //day three card
                        dayThreeTitle.textContent = moment().add(3, 'days').format("MM/DD/YY"); 
                        //console.log("day3 icon " + data.daily[3].weather[0].icon) //figure out
                        //console.log("day3 temp " + data.daily[3].temp.day) 
                        dayThreeTemp.textContent = "Temp: " + data.daily[3].temp.day + "\u00B0 F";
                        //console.log("day3 wind: " + data.daily[3].wind_speed);
                        dayThreeWind.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
                        //console.log("humidity day 3: " + data.daily[3].humidity);
                        dayThreeHumidity.textContent = "Humidity: " + data.daily[3].humidity + "%";
                        //day four card
                        dayFourTitle.textContent = moment().add(4, 'days').format("MM/DD/YY"); 
                        //console.log("day4 icon " + data.daily[4].weather[0].icon) //figure out
                        //console.log("day4 temp " + data.daily[4].temp.day) 
                        dayFourTemp.textContent = "Temp: " + data.daily[4].temp.day + "\u00B0 F";
                        //console.log("day4 wind: " + data.daily[4].wind_speed);
                        dayFourWind.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
                        //console.log("humidity day 4: " + data.daily[4].humidity);
                        dayFourHumidity.textContent = "Humidity: " + data.daily[4].humidity + "%";                        
                        //day five card
                        dayFiveTitle.textContent = moment().add(5, 'days').format("MM/DD/YY"); 
                        //console.log("day5 icon " + data.daily[5].weather[0].icon) //figure out
                        //console.log("day5 temp " + data.daily[5].temp.day) 
                        dayFiveTemp.textContent = "Temp: " + data.daily[5].temp.day + "\u00B0 F";
                        //console.log("day5 wind: " + data.daily[5].wind_speed);
                        dayThreeWind.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
                        //console.log("humidity day 5: " + data.daily[5].humidity);
                        dayFiveHumidity.textContent = "Humidity: " + data.daily[5].humidity + "%";
                        //weather icons 
                        for (i = 0; i < weatherIconArray.length; i++) {
                            weatherIconArray[i] = document.createElement('img');
                            weatherIconArray[i].src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png";
                            weatherIconArray[i].classList.add("weather-icon-image");
                            //console.log("WEATHER ICON ARRAY: " + weather);
                            cityTitleArray[i].appendChild(weatherIconArray[i]);
                        }
                        weatherIconArray[0].setAttribute('id', 'current-weather-icon-image');                     
                    })
            }
            getOneCallWeatherAPI();  
        })
}

//save cities to array in local storage
function saveCities () {
    //add new city name to the array 
    savedCityArray.push(inputedCityName)
    //if there is already values in the array, then concat the saved array to this new array (consisting of any cities searched while the browser is open)
    if (getSavedCityArray.length > 0) {
        combinedSavedCityArray = savedCityArray.concat(getSavedCityArray)
        //console.log("LENGTH" + getSavedCityArray.length)
        localStorage.setItem("savedCityNameArray", JSON.stringify(combinedSavedCityArray));
    //if array is empty, save to local storage 
    } else {
        localStorage.setItem("savedCityNameArray", JSON.stringify(savedCityArray));
    }
}

//on page load, get all the saved cities from last search (saved to local storage) and make the buttons and perform API searches on them again
function clickGeneratedCityBtn () { 
    generatedCityBtn.addEventListener('click', function (event){
        currentCityH2.textContent = "";
        weatherIconCurrent = '';
        currentTemp.textContent = "";
        currentWind.textContent = "";
        currentHumidity.textContent = "";
        inputedCityName = '';
        inputedCityName = event.target.value; 
        //console.log("INPUT CITY", inputedCityName)
        //console.log("RUNNING FUNCTIPONNN")
        getCurrentWeatherAPI();
        //console.log("is clickcitybtn working? ");
    }) 
}

function getSavedCities (){
    getSavedCityArray = JSON.parse(localStorage.getItem("savedCityNameArray")) || "";  
    console.log("get cit arr&77777777: " + getSavedCityArray)
    for (i=0; i< getSavedCityArray.length; i++) {
        var generatedCityLi = document.createElement('li');
        generatedCityLi.classList.add("generated-city-li");
        generatedCityBtn = document.createElement('BUTTON');
        generatedCityBtn.value = getSavedCityArray[i]; 
        console.log("NEW BUTTON VALUE: " + generatedCityBtn.value)
        generatedCityBtn.classList.add("generated-city-btn");        
        generatedCityLi.appendChild(generatedCityBtn);
        generatedCityBtn.textContent = getSavedCityArray[i];  
        generatedCitiesUl.appendChild(generatedCityLi);
        getSavedCurrentWeatherAPI();
        clickGeneratedCityBtn();
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
                    console.log("get current weather saved data for " + getSavedCityArray[i] + " next line") 
                    console.log(data);
                    lat = data.coord.lat;
                    //console.log("lat : " + lat);  
                    lon = data.coord.lon;
                    //console.log("lon: " + lon);
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
                            console.log("OneCall saved data for " + getSavedCityArray[i] + "next line") 
                            console.log(data)
                            })
                        } 
                    getSavedOneCallWeatherAPI();
                }) 
    } 
}
getSavedCities();

//create city list under search bar made of buttons with the name of the city searched
function generateCitiesList () {
    generatedCityLi = document.createElement('li');
    generatedCityLi.classList.add("generated-city-li")
    generatedCityBtn = document.createElement('BUTTON');
    generatedCityBtn.value = inputedCityName;
    generatedCityBtn.classList.add("generated-city-btn");        
    generatedCityLi.appendChild(generatedCityBtn);
    generatedCityBtn.textContent = inputedCityName; 
    generatedCitiesUl.appendChild(generatedCityLi);
    console.log("NEW BUTTON VALUE: " + generatedCityBtn.value);    
    clickGeneratedCityBtn();
}

//run these functions when clicking the search button
searchBtn.addEventListener('click', function creatingCityLists (event){
    getInputValue();
    saveCities();
    generateCitiesList();
    getCurrentWeatherAPI();
    blankInputEl.value = ''; 
    return;
})
