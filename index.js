let valueSearch = document.getElementById('searchValue');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form') ;
let main = document.querySelector('main');
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
});

let id = 'c7bf3834e427e9eb5f3eb238f1e1cbdb'
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;
const searchWeather = () =>{
    fetch(url + '&q=' + valueSearch.value)
    .then(responsive => responsive.json())
    .then (data =>{
        console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/shiny/64.png'
            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png'
            temperature.querySelector('figcaption span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
        }else{

            main.classList.add('error');
            setTimeout(()=>{
                main.classList.remove('error');
            },1000)
        }
        
        valueSearch.value = '';
    })
}

// add live location tracker


let geoid = '6dc65b68b492491b968557f32e9b959b'; // Your OpenCage API key

// Function to get the current position of the user
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchCityFromCoordinates, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

// Function to fetch the city using OpenCage API from latitude and longitude
const fetchCityFromCoordinates = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoid}`;

    // Make the API request
    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // If the city name is available, set it
            if (data.results && data.results.length > 0) {
                let cityName = data.results[0].components.city || "City not found";
                console.log("City:", cityName);

                // Assuming you have a search input element where the city name should be displayed
                if (valueSearch) {
                    valueSearch.value = cityName;
                    searchWeather();
                }
            } else {
                console.log("No city found.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
};

// Error handling function
const showError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
};

// Initialize the app by getting the user's location
const initApp = () => {
    getLocation(); // Automatically fetch the user's location
    searchWeather(); // You can also call other functions like searching weather
};


// Call initApp when the page is loaded
window.onload = initApp;
