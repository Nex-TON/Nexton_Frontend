import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

import { MainNftViewListType } from "./StakeView";
import StakeViewNFTs from "./StakeViewNFTs";
import StakeViewPoints from "./StakeViewPoints";
import StakeViewPools from "./StakeViewPools";

const MainNftViewList = ({ state }: { state: MainNftViewListType }) => {
  const { address, connected } = useTonConnect();
  const { nftList, isLoading } = useStakeInfo(address);

  switch (state) {
    case "point":
      return <StakeViewPoints isConnected={connected} />;
    case "nfts":
      return <StakeViewNFTs isConnected={connected} isLoading={isLoading} nftList={nftList} />;
    case "stake":
      return <StakeViewPools isConnected={connected} />;
  }
};

export default MainNftViewList;
