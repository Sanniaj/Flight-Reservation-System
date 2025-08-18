/**
 * flight_service.test.js
 *  
 * function: 
 *      - filterFlights()
 * 
 *  tech: 
 *      -jest.mock to load mock data NOGOOD 
 *      - use loadFlightData to get test_flight.json
 * 
 * test plan:
 *      input check
 *      - test 1. user did not input anything
 *      - test 2. user missed one input
 * 
 *      user input correcctly
 *      - test3 - no match from input
 *      - test4 - only one match matchFound
 *      - test5 - more than one match matchFound
 * 
 * our test data: 
 * 
 *  flight1: LAX → JFK  on 2025-08-13 at 10:20  ($355)
 *  flight2: LAX → JFK  on 2025-08-14 at 09:00  ($300)
 *  flight3: LAX → ORD  on 2025-08-13 at 14:30  ($250)
 *  flight4: LAX → JFK  on 2025-08-13 at 18:00  ($410)
 *  flight5: LAX → ORD  on 2025-08-15 at 07:00  ($280)
 * 
 */



import { jest } from "@jest/globals";


await jest.unstable_mockModule("../../repo/flight_data_repo.js", () => ({
  loadFlightData: jest.fn(),
}));


const { filterFlights } = await import("../../service/flight_search_service.js");
const { loadFlightData } = await import("../../repo/flight_data_repo.js");


const testFlights = [
  { flight_id: "Test1", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-13", departure_time: "10:20", price: 355 },
  { flight_id: "Test2", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-14", departure_time: "09:00", price: 300 },
  { flight_id: "Test3", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "ORD", departure_date: "2025-08-13", departure_time: "14:30", price: 250 },
  { flight_id: "Test4", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-13", departure_time: "18:00", price: 410 },
  { flight_id: "Test5", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "ORD", departure_date: "2025-08-15", departure_time: "07:00", price: 280 },
];

beforeEach(() => {
  loadFlightData.mockReturnValue(testFlights);
});


test("test 1: user did not input anything (should return empty array)", () => {
  const input = {};
  const result = filterFlights(input);
  expect(result).toEqual([]);
});

test("test 2: user miss one input (should return empty array)", () => {
  const input = { departure_airport: "LAX", arrival_airport: "JFK" }; // missing date input
  const result = filterFlights(input);
  expect(result).toEqual([]);
});

test("test 3: user input correctly, but no match from input ( date from data range from 08/13-15. input date = 08-20", () => {
  const input = { departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-20" }; 
  const result = filterFlights(input);
  expect(result).toEqual([]);
});

//flight_id: "Test2", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-14", departure_time: "09:00", price: 300
test("test 4: only one match found", () => {
  const input = { departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-14" };
  const result = filterFlights(input);
  expect(result.map(f => f.flight_id)).toEqual(["Test2"]);
});

//flight_id: "Test1", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-13", departure_time: "10:20", price: 355
//flight_id: "Test4", airline: "LikeAG6", departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-13", departure_time: "18:00", price: 410
test("test 5: more than one match found", () => {
  const input = { departure_airport: "LAX", arrival_airport: "JFK", departure_date: "2025-08-13" };
  const result = filterFlights(input);
  expect(result.map(f => f.flight_id).sort()).toEqual(["Test1", "Test4"].sort());
});