import { expect, test } from "vitest";

import { getLockUpDate } from "./getLockupDate";

// Test for empty input string
test("getLockUpDate should return 0 for empty input string", () => {
  const result = getLockUpDate("", 5);
  expect(result).toBe(0);
});

// Test for non-empty input string with leverage 0
test("getLockUpDate should return 50 for non-empty input string and leverage 0", () => {
  const result = getLockUpDate("some input", 0);
  expect(result).toBe(50);
});

// Test for non-empty input string with leverage 1
test("getLockUpDate should return 60 for non-empty input string and leverage 1", () => {
  const result = getLockUpDate("some input", 1);
  expect(result).toBe(60);
});
