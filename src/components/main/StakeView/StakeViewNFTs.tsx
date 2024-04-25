import { useNavigate } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";

import LandingNftStake from "@/assets/image/LandingNFTStake.png";
import { nftInfo } from "@/types/Nft";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";
import StakeViewNFTsItem from "./StakeViewNFTsItem";

const StakeViewNFTs = ({
  isConnected,
  isLoading,
  nftList,
}: {
  isConnected: boolean;
  isLoading: boolean;
  nftList?: nftInfo[];
}) => {
  const navigate = useNavigate();

  return isLoading ? (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>

        <MainNftStakeImg src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <EmptyNftItem isloading={isLoading} />
      <EmptyNftItem isloading={isLoading} />
    </MainStakeViewWrapper>
  ) : nftList?.filter(nft => nft.status !== 2).length === 0 || !isConnected ? (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>

        <MainNftStakeImg src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <EmptyNftItem />
      <EmptyNftItem />
    </MainStakeViewWrapper>
  ) : (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/myasset/nftlist")}>
        <MainNftInfoTitleBox>
          <p>My NFTs</p>
        </MainNftInfoTitleBox>
        <MainNftStakeImg src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      {nftList
        ?.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
        .filter(nft => nft.status !== 2)
        .slice(0, 2)
        .map((nft, index) => <StakeViewNFTsItem key={index} nftItem={nft} />)}
    </MainStakeViewWrapper>
  );
};

export default StakeViewNFTs;

const MainNftInfoBox = styled(MainStakeViewBox)`
  background: #2f3038;
`;

const MainNftStakeImg = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  bottom: 0;
  margin: auto;
`;

const MainNftInfoTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  p {
    color: #f2f2f7;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;

const shimmerAnimation = keyframes`
0% {
  background-position: -200% 0;
}
100% {
  background-position: 200% 0;
}
`;

const EmptyNftItem = styled(MainStakeViewBox)<{ isloading?: boolean }>`
  background-color: #f1f4f4;

  ${({ isloading }) =>
    isloading &&
    css`
      background: linear-gradient(90deg, #f1f4f4 25%, #f3f6f6 50%, #f1f4f4 75%);
      animation: ${shimmerAnimation} 1.5s infinite;
      background-size: 200% 100%;
    `}
`;
