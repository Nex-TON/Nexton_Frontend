import { useNavigate } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";

import LandingNftStake from "@/assets/image/LandingNFTStake.png";
import NftOngoing from "@/assets/image/NftOngoing.png?url";
import { nftInfo } from "@/types/Nft";

import { MainStakeViewBox, MainStakeViewWrapper } from "./common/StakeView.styled";
import StakeViewNFTsItem from "./StakeViewNFTsItem";

const StakeViewNFTs = ({
  connected,
  isLoading,
  nftList,
  stakedLocally,
}: {
  connected: boolean;
  isLoading: boolean;
  nftList?: nftInfo[];
  stakedLocally: string | null;
}) => {
  const navigate = useNavigate();

  return isLoading ? (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>

        <img src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <EmptyNftItem isloading={isLoading} />
      <EmptyNftItem isloading={isLoading} />
    </MainStakeViewWrapper>
  ) : nftList?.filter(nft => nft.status !== 2).length === 0 || !connected ? (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>

        <img src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      <EmptyNftItem />
      <EmptyNftItem />
    </MainStakeViewWrapper>
  ) : (
    <MainStakeViewWrapper>
      <MainNftInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftInfoTitleBox>
        <img src={LandingNftStake} alt="nftStake" />
      </MainNftInfoBox>

      {stakedLocally && (
        <MainNftInfoBox
          onClick={() => alert("Thanks for participating in Nexton demo!")}
          style={{
            background: `url(${NftOngoing})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MainNftInfoTitleBox>
            <p>Your assets</p>
            <p>STAKED using Nexton</p>
          </MainNftInfoTitleBox>
        </MainNftInfoBox>
      )}

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
