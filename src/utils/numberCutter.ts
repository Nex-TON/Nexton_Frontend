export const numberCutter = (num: number) => {
  // 세 자리 이상 소수점이 들어오는 경우 세 번째 자리에서 반올림 후 버림 처리
  const fixedNum = Math.floor(num * 1000) / 1000;

  // 정수 부분과 소수 부분 분리
  const parts = fixedNum.toString().split(".");

  // 정수 부분에 콤마 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 소수 부분이 없거나 길이가 부족한 경우 채움
  // if (!parts[1]) {
  //   parts[1] = "000";
  // } else if (parts[1].length === 1) {
  //   parts[1] += "00";
  // } else if (parts[1].length === 2) {
  //   parts[1] += "0";
  // }

  return parts.join(".");
};
