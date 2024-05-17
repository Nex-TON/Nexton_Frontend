import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

export const useUnstakingList = () => {
  const { address } = useTonConnect();
  const { nftList } = useStakeInfo(address);

  return {
    unstakingList: nftList?.filter(item => item.status === 1),
  };
};
