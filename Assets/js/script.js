//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
/* try again in a couple hrs to see if API key is working
var baseUrl = 'api.openweathermap.org/data/2.5/weather'
var APIKey = '3a1df45ecc477b266d4c9b728ee5cd1e'

var cityName = 'Atlanta' //update later to be what they enter into the form

function getAPI() {
    var requestUrl = baseUrl + '?q=' + cityName + '&appid=' + APIKey;
    console.log(requestUrl)
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })


}

getAPI()
*/
var submitBtn = document.querySelector('.submit-btn')
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
        // add class to generatedCityLi
        var generatedCityBtn = document.createElement('BUTTON');
        //add class to generated city btn
        generatedCityLi.appendChild(generatedCityBtn
        );
        generatedCityBtn.textContent = getSavedCityArray[i] //get from local storage
        generatedCitiesUl.appendChild(generatedCityLi);
    }
}

submitBtn.addEventListener('click', function creatingCityLists (event){
    event.preventDefault //why is this not keeping the buttons from going away?
    saveCities()
    getSavedCities()
    generateCitiesList()
    return;
}
)



/*
submitBtn.addEventListener('click', function generateCitiesList () {
    for (i=0; i< savedCityArray.length //NEED TO CREATE/ACCESS ARRAY OF STORED CITIES FROM LOCAL STORAGE; i++) {
        var generatedCityLi = document.createElement('li');
        // add class to generatedCityLi
        var generatedCityBtn = document.createElement('BUTTON');
        //add class to generated city btn
        generatedCityLi.appendChild(generatedCityBtn
        );
        generatedCityBtn.textContent = "example" //get from local storage
        generatedCitiesUl.appendChild(generatedCityLi);
    }
}


*/