/**
 * 자리수만큼 숫자를 버림하는 유틸함수
 */
interface FloorHexProps {
  number: string;
  decimalPlaces: number;
}

export const floorHex = (props: FloorHexProps) => {
  const { number, decimalPlaces } = props;

  const divisor = 10 ** 18;
  const dividedNumber = Number(number) / divisor;
  const multipliedNumber = dividedNumber * 10 ** decimalPlaces;
  const result = Math.floor(multipliedNumber) / 10 ** decimalPlaces;

  return result;
};
