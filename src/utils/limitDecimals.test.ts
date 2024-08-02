// utils.test.ts
import { expect, test } from "vitest";

import { limitDecimals } from "./limitDecimals";

test("limits decimals correctly", () => {
  expect(limitDecimals(12.536, 2)).toBe("12.53");
  expect(limitDecimals(12.5, 2)).toBe("12.5");
  expect(limitDecimals(12, 2)).toBe("12");
  expect(limitDecimals(12.536789, 4)).toBe("12.5367");
  expect(limitDecimals(12.536, 5)).toBe("12.536");
  expect(limitDecimals(0.123456, 3)).toBe("0.123");
  expect(limitDecimals(-0.123456, 3)).toBe("-0.123");
  expect(limitDecimals(-0.123456, 0)).toBe("-0");
  expect(limitDecimals(123456, 3)).toBe("123456");
});
