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

// 날짜 계산

function formatDate(date: Date, type?: string): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return type === "expired"
    ? `${day}.${month}.${year}`
    : `${day} / ${month} / ${year}`;
}

export const lockUpDateChanger = (date: number, type?: string) => {
  const currentDate = new Date();
  // Copy the current date and add 83 days to it
  const futureDate = new Date(currentDate.getTime());
  futureDate.setDate(futureDate.getDate() + date);

  // Format the future date as "dd/mm/yy"
  const formattedFutureDate = formatDate(futureDate, type);

  return formattedFutureDate;
};
