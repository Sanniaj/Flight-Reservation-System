
/** event listener for search button
 * get the search button click event
 * retrieves the values from the input fields in the search box
 * create string from user input value
 * trim emptyspace
 * convert value to uppercase
 * @listens html#searchButton click
 * async function: add waiting point for fetch -> when the search button is clicked
 * this will pause at await point and wait for the fetch request to complete
 */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", async function() {
        const departureInput = document.getElementById("departure_airport").value.trim().toUpperCase();
        const arrivalInput = document.getElementById("arrival_airport").value.trim().toUpperCase();
        const departureDate = document.getElementById("departure_date").value;

        // const returnDate = document.getElementById("return_date").value;
        // const returnDepartureInput = document.getElementById("return_departure_input").value;
        // const returnArrivalInput = document.getElementById("return_arrival_input").value;


        // check if user has filled in all required input field
        if(!departureInput || !arrivalInput || !departureDate) {
        alert("Please fill in your search criteria and Departure Date");
        return;
        }

        /**
         * create a URLSearchParams object from the user's search input.
         * This will be used to construct the query string for the API request.
         * @param {string} departure_airport - the cleaned and uppper case departure airport value
         * @param {string} arrival_airport - the arrival airport input value
         * @param {string} departure_date - the departure date input value
         */
        const qs = new URLSearchParams({
            departure_airport: departureInput,
            arrival_airport: arrivalInput,
            departure_date: departureDate
        });

        const URL = `/api/flight_search?${qs.toString()}`;

        console.log("Search URL:", URL);

        /**
         * the browser sends a GET request to the server at /api/flight_search
         * fetch(URL) start the request and waits for the response
         * the response is then converted to JSON
         * console.log log the search results to console for debugging
         */
        const res = await fetch(URL);
        const data = await res.json();
        console.log("Search Results:", data);

    });




});
















