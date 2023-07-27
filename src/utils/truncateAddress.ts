/**
 * 지갑 주소 자르기
 */

interface TruncateAddressProps {
  address: string;
  type: string;
}

export const truncateAddress = (props: TruncateAddressProps) => {
  const { address, type } = props;
  if (!address) return "";
  if (type === "wallet") {
    return `${address.slice(0, 12)}...${address.slice(-3)}`;
  } else {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  }
};
