import { expect, test, vi } from "vitest";

import { copyText } from "./copyText";

const setupNavigatorMock = () => {
  Object.assign(global, {
    navigator: {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    },
  });
};

// Mocking the clipboard API
setupNavigatorMock();

test("copyText calls navigator.clipboard.writeText with the correct text", async () => {
  const text = "Hello, World!";
  await copyText(text);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
});
