## overview
    - this document explain the design details for roundtrip options as well as design layout for both one_way and round_trip flight type. 

## flight_type:
    - flight.one_way
    - flight.round_trip
    // flight type will determine how the search box will behave and backend will filter search accordingly.

## UI layout

### for one way trip
    - [swap] button is visible
    - [search button] -> trigger flight.one_way search logic
    - [roundtrip] button is always visible
|-------------------------------------------------------------------------------|
|  [ Departure ]  [swap]  [ Arrival ]    [ Departure Date ] [search button]     |
|                                                                               |
|  [ROUNDTRIP <v>]                                                              ||
|-------------------------------------------------------------------------------|

### for round-trip search - trigger when clicking the round-trip button drop down style
    - drop down section that shows return input box
    - [swap] button is hidden;
    - one_way [search button] is hidden;
    - round_trip [roundtrip_search] button appear at the bottom;
    - reverse direction for return search box;

|-------------------------------------------------------------------------------|
| [ Departure ] [ Arrival ] [ Departure Date ]                                  |                        
|                                                                               |
|  [ROUNDTRIP <v>]                                                              |
|-------------------------------------------------------------------------------|
↓
|-------------------------------------------------------------------------------|
| [ Arrival ] [ Departure ] [ Return Date ] [roundtrip_search]                  |            
|-------------------------------------------------------------------------------|

 ## system behavior: ** require 'CART' class
 ### one_way
    - flight_type = flight.one_way;
    - system will filter and display flights that match departure, arrival, departure_date;
    - user select only one flight; 
    ***EQUIRE CART CLASS***
    - user add flight to cart;
    - user check out flight;
    
### round_trip
    - flight_type = flight.round_trip;
    - system will filter flight that match: 
        - departure flight: departure -> arrival + departure_date;
        - return flight: arrival -> departure + return_date;

    - system will display 2 field of results: both
        - departure_flight -> departure_flight_results;
        - return_flight -> return_flight_results;
    - user can choose preferred departure and return flight to add to cart
    ***REQUIRE CART CLASS***

### Cart class: not yet implemented
    - flight_type: 'one_way', 'round_trip'
    - selected_flight: display selected flights informations;
    ***NEED Flight_ID TO BE LINKED TO flight_details***
    - add_flight: flight_ID
    - remove_flight: flight_id
    - [checkout] button to check out