/**
 * 날짜 자르기 dd/mm/yy
 */

export const dateChangerShorter = (dateString: string) => {
  const dateObj = new Date(dateString);
  const year = String(dateObj.getFullYear()).slice(-2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
