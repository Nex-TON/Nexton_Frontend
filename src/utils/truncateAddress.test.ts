import { expect, test } from "vitest";

import { truncateAddress } from "./truncateAddress";

test("truncateAddress should handle non-wallet type correctly", () => {
  const props = { address: "0x1234567890abcdef1234567890abcdef12345678", type: "non-wallet" };
  const result = truncateAddress(props);
  expect(result).toBe("0x123...678");
});

test("truncateAddress should return empty string for empty address", () => {
  const props = { address: "", type: "wallet" };
  const result = truncateAddress(props);
  expect(result).toBe("");
});

test("truncateAddress should handle undefined address", () => {
  const props = { address: undefined, type: "wallet" } as any;
  const result = truncateAddress(props);
  expect(result).toBe("");
});

test("truncateAddress should handle long address for non-wallet type", () => {
  const props = { address: "0x1234567890abcdef1234567890abcdef12345678", type: "non-wallet" };
  const result = truncateAddress(props);
  expect(result).toBe("0x123...678");
});
