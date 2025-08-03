
document.addEventListener("DOMContentLoaded", () =>{

    // retrieve 'searchResults' from localstorage and JSON.parse to convert the string back to text.
    const searchResults = JSON.parse(localStorage.getItem("searchResults")); 

    console.log("searchResults from localStorage:", searchResults); 

    // check if searchResults have data in it. 
    if (searchResults && searchResults.length > 0){ 

        //display a message with amount of search results found
        const message = searchResults.length + " flights found."

        // go to searchResults and clear out any left over data with <br>
        document.getElementById("searchResults").innerHTML = message + "<br>";

        //loop through filtered flight results, i=0 -> end of results.
        for(let i = 0; i <searchResults.length; i++) {
            
            //create temp variable 'flight' to hold data as we loop
            const flight= searchResults[i];
            const flightResults = "displaying filtered results: " + "Departure: " + flight.departure + " | " + "Arrival: " + flight.arrival + " | " 
                            + "Departure Date: " + flight.departureDate + " | " + "Departure Time: " + flight.departureTime + " | Price: $" + flight.price;

            // add message to 'searchResults'   
            // += messege keeps adding to existing results. 
            // <br> break row after each result (enter) 
            // .innerHTML puts the message inside the results box on the page              
            document.getElementById("searchResults").innerHTML += flightResults + "<br>";
        }

    } else{  // if no data

        // get to searchResults, replace data in it with "message"
        document.getElementById("searchResults").innerHTML = "no flight results found";
    }
})