import { useWalletData } from "@/context/WalletConnectionProvider";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";

export const useUnstakingList = () => {
  const { address } = useWalletData();
  const { nftList } = useStakeInfo(address);

  return {
    unstakingList: nftList?.filter(item => item.status === 2),
  };
};
