/**
 * 
 * flight.test.js
 * 
 * //this is to tes the flight.js class
 *  function to test: flightCheck()
 * 
 *  test plan: check 
 *      - uppercase, lowercase
 *      - check empty space trim()
 *      = compare inputs. from, to, date. 
 * 
 * 
 * 
 * 
 */

import { Flight } from '../../domain/flight.js';

describe("flight class - flightCheck()", () => {

    test("flightCheck can handle uppercase and lowercase input (departure + arival airport)", () => {

        const input = new Flight("F100", "test1 Airline", "LAX", "JFK","2025-08-17", "10:00", 350);
        const result = input.flightCheck({from: "lax", to: "jfk", date: "2025-08-17"});

        expect(result).toBe(true);

    });

    test("flightCheck can handle empty space input (departure + arrival airport", () => {

        const input = new Flight("F100", "test1Airline", "LAX", "JFK","2025-08-17", "10:00", 350);
        const result = input.flightCheck({from: " LAX  ", to: "JFK     ", date: "2025-08-17"});
        
        expect(result).toBe(true);
    });

     test("flightCheck check for flights with wrong departure (input: MCO - LAX, data: LAX - JFK)", () => {

        const input = new Flight("F100", "test1Airline", "LAX", "JFK","2025-08-17", "10:00", 350);
        const result = input.flightCheck({from: "MCO", to: "JFK", date: "2025-08-17"});

        expect(result).toBe(false);
    });

     test("flightCheck check for flights with wrong arrival (input: LAX - MCO, data: LAX - JFK)", () => {

        const input = new Flight("F100", "test1Airline", "LAX", "JFK","2025-08-17", "10:00", 350);
        const result = input.flightCheck({from: "LAX", to: "MCO", date: "2025-08-17"});

        expect(result).toBe(false);
    });

     test("flightCheck check for flights with wrong Date (Date: 2025-08-10 data: 2025-08-17 )", () => {

        const input = new Flight("F100", "test1Airline", "LAX", "JFK","2025-08-17", "10:00", 350);
        const result = input.flightCheck({from: "LAX", to: "MCO", date: "2025-08-10"});

        expect(result).toBe(false);
    });


});