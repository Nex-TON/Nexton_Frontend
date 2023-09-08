/**
 * 날짜 자르기 dd/mm/yy
 */

export const dateChangerShorter = (dateString: string) => {
  const dateObj = new Date(dateString);
  const year = String(dateObj.getFullYear()).slice(-2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

export const expiredDateChanger = (
  dateString: string,
  lockPeriod: number,
  type?: string
) => {
  const dateObj = new Date(dateString);
  dateObj.setDate(dateObj.getDate() + lockPeriod);
  const year = String(dateObj.getFullYear()).slice(-2);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  return type === "detail"
    ? `${day}/${month}/${year}`
    : `${day}.${month}.${year}`;
};

export const DDayChange = (dateString: string, lockPeriod: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateObj = new Date(dateString);
  dateObj.setDate(dateObj.getDate() + lockPeriod);
  dateObj.setHours(0, 0, 0, 0);

  let differenceInMs = dateObj.getTime() - today.getTime();

  // Convert the difference to days
  let days = differenceInMs / (1000 * 60 * 60 * 24);

  return days;
};
// 날짜 계산

export function formatDate(date: Date, type?: string): string {
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

export const UnstakingDateChanger = (dateString: string, type?: string) => {
  const currentDate = new Date(dateString);
  const thirtySixHours = 36 * 60 * 60 * 1000;
  const newDate = new Date(currentDate.getTime() + thirtySixHours);
  const year = String(newDate.getFullYear()).slice(-2);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");

  return type === "detail"
    ? `${day}/${month}/${year}`
    : `${day}.${month}.${year}`;
};

export const AvailableDate = (dateString: string, type?: string) => {
  const now = new Date();
  const currentDate = new Date(dateString);
  const thirtySixHours = 36 * 60 * 60 * 1000;
  const newDate = new Date(currentDate.getTime() + thirtySixHours);

  const diff = newDate.getTime() - now.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60) % 24;

  return hours;
};
