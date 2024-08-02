import { expect, test } from "vitest";

import { floorHex } from "./floorHex";

test("floorHex should floor the number correctly for given decimal places", () => {
  // Test case 1
  let props = { number: "1234567890000000000", decimalPlaces: 2 };
  let result = floorHex(props);
  expect(result).toBe(1.23);

  // Test case 2
  props = { number: "9876543210000000000", decimalPlaces: 4 };
  result = floorHex(props);
  expect(result).toBe(9.8765);

  // Test case 3
  props = { number: "1000000000000000000", decimalPlaces: 0 };
  result = floorHex(props);
  expect(result).toBe(1);

  // Test case 4
  props = { number: "1000000000000000001", decimalPlaces: 0 };
  result = floorHex(props);
  expect(result).toBe(1);

  // Test case 5
  props = { number: "1234500000000000000", decimalPlaces: 5 };
  result = floorHex(props);
  expect(result).toBe(1.2345);

  // Test case 6: Test edge case with 0 decimal places
  props = { number: "999999999999999999", decimalPlaces: 0 };
  result = floorHex(props);
  expect(result).toBe(1);
});

test("floorHex should handle invalid inputs gracefully", () => {
  // Test case 7: Test invalid number string
  const props = { number: "invalid", decimalPlaces: 2 };
  expect(() => floorHex(props)).toThrow(Error);

  // Test case 8: Test negative decimal places
  const propsNegativeDecimal = { number: "1234567890000000000", decimalPlaces: -1 };
  expect(() => floorHex(propsNegativeDecimal)).toThrow(Error);

  // Test case 9: Test very small number string
  const propsSmallNumber = { number: "0", decimalPlaces: 2 };
  const resultSmallNumber = floorHex(propsSmallNumber);
  expect(resultSmallNumber).toBe(0);
});
