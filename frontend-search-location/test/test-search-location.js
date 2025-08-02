document.addEventListener("DOMContentLoaded" , () => {

    const searchButton =document.getElementById("searchButton")                 //go to SearbhButton element

    searchButton.addEventListener("click", () =>{                               //when the searchButton is clicked, run this function   
    console.log("Search clicked");

    const departure = document.getElementById("departure").value;               // create a variable "name" and assign the input into "variable"
    const arrival = document.getElementById("arrival").value;
    const departureDate = document.getElementById("departureDate").value;
    //const departureTime = document.getElementById("departureTime").value;

        if(!departure || !arrival || !departureDate){
            alert("please fill out all search criteria");
            return;
        }


        fetch("flight-data.csv")                //fetch flight-data file and 
        .then(response => response.text()) // convert it to plain text - data come out as a big block of text. need to make an array for data
        .then(data => {                     // 
        
            let filterData = []; //## declare an [array] to later push matching data into it.##

            const rows = data.split('\n');  // split data into rows - row1 row2 row3. berfore loop happens to loop by row


            for (let i = 1; i < rows.length; i++){ // LOOP START - to run through flight-data, skip row 0

                const row = rows[i]; // lok at one row and compare user input with data
                const columns = row.split(',');     // split data into separate value by column. 

                /* Assign column to designated variables
                  column 0     column 1    column2         column3     
                  Departure   Arrival     DepartureDate   departureTime */
                const csvDeparture = columns[0];
                const csvArrival = columns[1];
                const csvDepartureDate  = columns[2];
                const csvDepartureTime = columns[3];

                // compare inputs. if input does not match, continue to next variable.
                if(csvDeparture !== departure) continue; //if data does not match, skip this row.
                if(csvArrival !== arrival) continue;
                if(csvDepartureDate !== departureDate) continue;

                // if(csvDepartureTime !== departureTime) continue; //time is not a search criteria. we only need departure, arrival and date. user can pick time they want

                // add the matched data into the array 'filterData'
                filterData.push({                   
                    departure: csvDeparture,
                    arrival: csvArrival,
                    departureDate: csvDepartureDate,
                    departureTime: csvDepartureTime
                });
            } // loop end

            // Store filtered flights into a local storage named 'searchResult'
            // local storage only accept string so we converted our text value back to string to store SON.stringify(array)
            localStorage.setItem("searchResults", JSON.stringify (filterData));
            window.location.href = "test-search-results.html"; // redirect user to a new page 'rest-result.html' 

 
    });











        })


});