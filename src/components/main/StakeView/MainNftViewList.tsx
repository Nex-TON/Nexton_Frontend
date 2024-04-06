import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

import { MainNftViewListType } from "./StakeView";
import StakeViewNFTs from "./StakeViewNFTs";
import StakeViewPoints from "./StakeViewPoints";
import StakeViewPools from "./StakeViewPools";

const MainNftViewList = ({ state }: { state: MainNftViewListType }) => {
  const { address, connected } = useTonConnect();
  const { nftList, isLoading } = useStakeInfo(address);

  const stakedLocally = localStorage.getItem("staked");

  switch (state) {
    case "point":
      return <StakeViewPoints connected={connected} />;
    case "nfts":
      return (
        <StakeViewNFTs connected={connected} isLoading={isLoading} nftList={nftList} stakedLocally={stakedLocally} />
      );
    case "stake":
      return <StakeViewPools />;
  }
};

export default MainNftViewList;
