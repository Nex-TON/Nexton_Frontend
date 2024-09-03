/**
 * getNftState - Determines the state of the NFT based on the unstakable date.
 *
 * @param {string} unstakableDate - The unstakable date of the NFT in "dd.mm.yyyy" format.
 * @returns {string} - The state of the NFT ("ongoing", "forthcoming", "expired").
 *
 * The function calculates the remaining days until the unstakable date:
 * - If the remaining days are greater than 15, it returns "ongoing".
 * - If the remaining days are between 1 and 15, it returns "forthcoming".
 * - If the remaining days are 0 or less, it returns "expired".
 */
export const getNftState = (unstakableDate: string): string => {
  const remainingDays = calculateRemainingDays(unstakableDate);

  if (remainingDays > 15) {
    return "ongoing";
  } else if (remainingDays > 0) {
    return "forthcoming";
  } else {
    return "expired";
  }
};

/**
 * calculateRemainingDays - Calculates the remaining days until the unstakable date.
 *
 * @param {string} unstakableDate - The unstakable date of the NFT in "dd.mm.yyyy" format.
 * @returns {number} - The number of remaining days until the unstakable date.
 */
export const calculateRemainingDays = (unstakableDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateParts = unstakableDate.split(".");
  const unstakableDateObj = new Date(
    parseInt(dateParts[2], 10), // Assuming the year is in "yyyy" format
    parseInt(dateParts[1], 10) - 1,
    parseInt(dateParts[0], 10),
  );
  unstakableDateObj.setHours(0, 0, 0, 0);

  const differenceInMs = unstakableDateObj.getTime() - today.getTime();
  return differenceInMs / (1000 * 60 * 60 * 24);
};
