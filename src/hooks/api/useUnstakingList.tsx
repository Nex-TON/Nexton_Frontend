import useTonConnect from "../../hooks/contract/useTonConnect";
import { useStakeInfo } from "./useStakeInfo";

export const useUnstakingList = () => {
  const { address } = useTonConnect();
  const { nftList } = useStakeInfo(address);

  return {
    unstakingList: nftList?.filter((item) => item.status === 1),
  };
};