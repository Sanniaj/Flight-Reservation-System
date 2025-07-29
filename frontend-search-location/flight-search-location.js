let departureLocation,arrivalLocation

const flightSearchResults = () => {
    departureLocation = document.getElementById("departure").value;
    arrivalLocation = document.getElementById("arrival").value;

    window.location.href = "flight-search-results.html";

    return saveFlightSearchResults(departureLocation, arrivalLocation);
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


