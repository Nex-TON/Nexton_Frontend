export const numberCutter = (num: number) => {
  // Floor the number to the third decimal place
  // Multiply by 1000, floor it, then divide by 1000 to get the desired precision
  const fixedNum = Math.floor(num * 1000) / 1000;

  // Split the number into integer and decimal parts
  const parts = fixedNum.toString().split(".");

  // Add commas to the integer part for better readability
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Ensure the decimal part has exactly three digits
  // if (!parts[1]) {
  //   parts[1] = "000";
  // } else if (parts[1].length === 1) {
  //   parts[1] += "00";
  // } else if (parts[1].length === 2) {
  //   parts[1] += "0";
  // }

  return parts.join(".");
};
