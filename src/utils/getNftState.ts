/**
 * getNftState - Determines the state of the NFT based on the unstakable date.
 *
 * @param {string} unstakableDate - The unstakable date of the NFT in Date format.
 * @returns {string} - The state of the NFT ("ongoing", "forthcoming", "expired").
 *
 * The function calculates the remaining days until the unstakable date:
 * - If the remaining days are greater than 15, it returns "ongoing".
 * - If the remaining days are between 1 and 15, it returns "forthcoming".
 * - If the remaining days are 0 or less, it returns "expired".
 */
import { limitDecimals } from "./limitDecimals";
export const getNftState = (unstakableDate?: string): string => {
  if (!unstakableDate) {
    return "unknown";
  }

  const remainingDays = calculateRemainingDays(unstakableDate);

  if (remainingDays >0) {
    return "ongoing";
  }else {
    return "expired";
  }
};

/**
 * calculateRemainingDays - Calculates the remaining days until the unstakable date.
 *
 * @param {string} unstakableDate - The unstakable date of the NFT in Date format.
 * @returns {number} - The number of remaining days until the unstakable date.
 */
export const calculateRemainingDays = (unstakableDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const unstakableDateObj = new Date(unstakableDate);
  unstakableDateObj.setHours(0, 0, 0, 0);

  const differenceInMs = unstakableDateObj.getTime() - today.getTime();
  return differenceInMs / (1000 * 60 * 60 * 24);
};

/**
 * getText - Generates a D-Day text based on the unstakable date.
 *
 * @param {string} unstakableDate - The unstakable date of the NFT in Date format.
 * @returns {string} - The D-Day text ("D-<days>", "D-Day", "D+<days>").
 *
 * The function calculates the remaining days until the unstakable date:
 * - If the remaining days are greater than 0, it returns "D-<remainingDays>".
 * - If the remaining days are 0, it returns "D-Day".
 * - If the remaining days are less than 0, it returns "D+<absolute remainingDays>".
 */
export const getDDayText = (unstakableDate?: string): string => {
  if (!unstakableDate) {
    return "unknown";
  }

  const remainingDays = limitDecimals(calculateRemainingDays(unstakableDate),0);

  if (remainingDays > 0) {
    return `D-${remainingDays}`;
  } else if (remainingDays === 0) {
    return `D-Day`;
  } else {
    return `D+${remainingDays * -1}`;
  }
};