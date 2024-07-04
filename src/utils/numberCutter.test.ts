import { expect, test } from "vitest";

import { numberCutter } from "./numberCutter";

// Test for number with more than three decimal places
test("numberCutter should floor the number to the third decimal place and format correctly", () => {
  const result = numberCutter(12345.67891);
  expect(result).toBe("12,345.678");
});

// Test for number with exactly three decimal places
test("numberCutter should handle number with exactly three decimal places correctly", () => {
  const result = numberCutter(12345.678);
  expect(result).toBe("12,345.678");
});

// Test for number with fewer than three decimal places
test("numberCutter should handle number with fewer than three decimal places correctly", () => {
  const result = numberCutter(12345.67);
  expect(result).toBe("12,345.67");
});

// Test for integer number
test("numberCutter should handle integer number correctly", () => {
  const result = numberCutter(12345);
  expect(result).toBe("12,345");
});

// Test for large number with more than three decimal places
test("numberCutter should floor large number to the third decimal place and format correctly", () => {
  const result = numberCutter(9876543210.12345);
  expect(result).toBe("9,876,543,210.123");
});

// Test for negative number with exactly three decimal places
test("numberCutter should handle negative number with exactly three decimal places correctly", () => {
  const result = numberCutter(-12345.678);
  expect(result).toBe("-12,345.678");
});

// Test for negative number with fewer than three decimal places
test("numberCutter should handle negative number with fewer than three decimal places correctly", () => {
  const result = numberCutter(-12345.67);
  expect(result).toBe("-12,345.67");
});

// Test for negative integer number
test("numberCutter should handle negative integer number correctly", () => {
  const result = numberCutter(-12345);
  expect(result).toBe("-12,345");
});
