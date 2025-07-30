import {locationSearch} from "./locationSearch.js";

let departureLocation, arrivalLocation;

const flightSearchResults = () => {
    departureLocation = document.getElementById("departure").value;
    arrivalLocation = document.getElementById("arrival").value;


    console.log("Searching departure location:");
    locationSearch(departureLocation);

    console.log("Searching arrival location:");
    locationSearch(arrivalLocation);

    saveFlightSearchResults();
    window.location.href = "flight-search-results.html";
}

const saveFlightSearchResults = () => {
    localStorage.setItem("departureLocation", JSON.stringify(departureLocation));
    localStorage.setItem("arrivalLocation", JSON.stringify(arrivalLocation));
}

const displayFlightSearchResults = () => {
    const dep = JSON.parse(localStorage.getItem("departureLocation"));
    const arr = JSON.parse(localStorage.getItem("arrivalLocation"));
    document.getElementById("searchFlights").innerHTML = `Looking at flights from ${dep} to ${arr}`;
}

document.addEventListener('DOMContentLoaded', () => {
    //for search page
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', flightSearchResults);
    }

    // for results
    const searchFlights = document.getElementById('searchFlights');
    if (searchFlights) {
        displayFlightSearchResults();
    }
});