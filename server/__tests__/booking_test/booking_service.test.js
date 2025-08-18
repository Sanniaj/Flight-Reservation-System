/**
 * booking_service.test.js
 * 
 * function:
 *      - cancelBooking()
 * 
 * tech:
 *      - jest
 * 
 * test plan:
 *      - test 1: cancel a confirmed booking -> status should be set to canceled
 *      - test 2: cancel a booking that is already canceled -> nothing change here.
 *      - test 3: cancel with wrong confirmation code or email 
 */

import { jest } from "@jest/globals";

await jest.unstable_mockModule("../../repo/booking_repo.js", () => ({
  loadBookings: jest.fn(),
  saveBookings: jest.fn(),
}));

const { cancelBooking } = await import("../../service/booking_service.js");
const { loadBookings, saveBookings } = await import("../../repo/booking_repo.js");

const testBookings = [
  {
    confirmation: "AAA111",
    customer: { email: "use1@testing.com" },
    status: "CONFIRMED"
  },
  {
    confirmation: "BBB222",
    customer: { email: "user2@testing.com" },
    status: "CANCELED"
  }
];


beforeEach(() => {
  loadBookings.mockReturnValue([...testBookings]);
  saveBookings.mockClear();
});

// test 1: cancel a confirmed booking
test("test 1: cancel a confirmed booking -> status should be set to canceled", () => {
  const result = cancelBooking("AAA111", "use1@testing.com");
  expect(result.status).toBe("CANCELED");
  expect(saveBookings).toHaveBeenCalled(); 
});

// test 2: cancel a booking that is already canceled
test("test 2: cancel a booking that is already canceled -> nothing change here", () => {
  const result = cancelBooking("BBB222", "user2@testing.com");
  expect(result.status).toBe("CANCELED");
  expect(saveBookings).not.toHaveBeenCalled(); 
});

// test 3: cancel with wrong confirmation code or email
test("test 3: cancel with wrong confirmation code or email", () => {
  const result = cancelBooking("NOTFOUND", "wrongemail@testing.com");
  expect(result).toBeNull();
  expect(saveBookings).not.toHaveBeenCalled();
});