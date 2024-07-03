import { expect, test } from "vitest";

import {
  AvailableDate,
  dateChangerShorter,
  DDayChange,
  expiredDateChanger,
  formatDate,
  lockUpDateChanger,
  ReferralDateFormatter,
  UnstakingDateChanger,
} from "./dateChanger";

// Test for dateChangerShorter
test("dateChangerShorter should format date correctly", () => {
  expect(dateChangerShorter("2024-06-14")).toBe("06.14.24");
});

// Test for expiredDateChanger
test("expiredDateChanger should add lock period and format date correctly", () => {
  expect(expiredDateChanger("2024-06-14", 30)).toBe("07.14.24");
  expect(expiredDateChanger("2024-06-14", 30, "detail")).toBe("07.14.24");
});

// Test for DDayChange
test("DDayChange should calculate the difference in days correctly", () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureDate = new Date(today.getTime());
  futureDate.setDate(futureDate.getDate() + 30);
  expect(DDayChange(today.toISOString(), 30)).toBe(30);
});

// Test for formatDate
test("formatDate should format date correctly", () => {
  expect(formatDate(new Date("2024-06-14"))).toBe("06.14.24");
  expect(formatDate(new Date("2024-06-14"), "expired")).toBe("06.14.24");
});

// Test for lockUpDateChanger
test("lockUpDateChanger should add days and format date correctly", () => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime());
  futureDate.setDate(futureDate.getDate() + 83);
  const formattedFutureDate = `${String(futureDate.getMonth() + 1).padStart(2, "0")}.${String(futureDate.getDate()).padStart(2, "0")}.${String(futureDate.getFullYear()).slice(-2)}`;
  expect(lockUpDateChanger(83)).toBe(formattedFutureDate);
  expect(lockUpDateChanger(83, "expired")).toBe(formattedFutureDate);
});

// Test for UnstakingDateChanger
test("UnstakingDateChanger should add 9 hours and format date correctly", () => {
  expect(UnstakingDateChanger("2024-06-14T00:00:00", "detail")).toBe("06.14.24");
  expect(UnstakingDateChanger("2024-06-14T00:00:00")).toBe("06.14.24");
});

// Test for ReferralDateFormatter
test("ReferralDateFormatter should format date correctly", () => {
  expect(ReferralDateFormatter("2024-06-14")).toBe("June 14, 24");
});
