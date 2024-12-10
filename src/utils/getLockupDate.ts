export const getLockUpDate = (input: string, leverage: number) => {
  if (input === "") {
    return 0;
  } else {
    return Math.floor(5 + 10 * leverage ** 3);
  }
};
