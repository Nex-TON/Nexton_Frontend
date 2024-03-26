import { css, keyframes, styled } from "styled-components";
import { useStakeInfo } from "../../../hooks/api/useStakeInfo";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import MainNftViewItem from "./MainNftViewItem";
import LandingNftStake from "../../../assets/image/LandingNFTStake.png";
import NftOngoing from "../../../assets/image/NftOngoing.png?url";
import { useNavigate } from "react-router-dom";

const MainNftViewList = () => {
  const { address, connected } = useTonConnect();
  const { nftList, isLoading } = useStakeInfo(address);
  const navigate = useNavigate();

  const stakedLocally = localStorage.getItem("staked");

  return isLoading ? (
    <MainNftViewListWrapper>
      <MainNftFirstInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftFirstInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftFirstInfoTitleBox>
        <img src={LandingNftStake} alt="nftStake" />
      </MainNftFirstInfoBox>
      <EmptyNftItem isloading={isLoading} />
      <EmptyNftItem isloading={isLoading} />
    </MainNftViewListWrapper>
  ) : nftList?.filter((nft) => nft.status !== 2).length === 0 || !connected ? (
    <MainNftViewListWrapper>
      <MainNftFirstInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftFirstInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftFirstInfoTitleBox>
        <img src={LandingNftStake} alt="nftStake" />
      </MainNftFirstInfoBox>
      <EmptyNftItem />
      <EmptyNftItem />
    </MainNftViewListWrapper>
  ) : (
    <MainNftViewListWrapper>
      <MainNftFirstInfoBox onClick={() => navigate("/stake/amount")}>
        <MainNftFirstInfoTitleBox>
          <p>Get NFTs</p>
          <p>with STAKE</p>
        </MainNftFirstInfoTitleBox>
        <img src={LandingNftStake} alt="nftStake" />
      </MainNftFirstInfoBox>

      {/* ❗NOTE❗: NFT for participating in demo version. To be removed! */}
      {stakedLocally && (
        <MainNftFirstInfoBox
          onClick={() => alert("Thanks for participating in Nexton demo!")}
          style={{
            background: `url(${NftOngoing})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MainNftFirstInfoTitleBox>
            <p>Your assets</p>
            <p>STAKED using Nexton</p>
          </MainNftFirstInfoTitleBox>
        </MainNftFirstInfoBox>
      )}

      {nftList
        ?.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
        .filter((nft) => nft.status !== 2)
        .slice(0, 2)
        .map((nft, index) => <MainNftViewItem key={index} nftItem={nft} />)}
    </MainNftViewListWrapper>
  );
};

export default MainNftViewList;

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const MainNftViewListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1fr 1fr;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  margin: 2.1rem 0;
`;

const MainNftFirstInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.7rem;

  width: 100%;
  aspect-ratio: 1/1.05;
  padding: 1.5rem 1.5rem 1.6rem 1.5rem;

  border-radius: 2rem;
  background-color: #2f3038;
  cursor: pointer;
`;

const MainNftFirstInfoTitleBox = styled.div`
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

const EmptyNftItem = styled.div<{ isloading?: boolean }>`
  width: 100%;
  aspect-ratio: 1/1.05;
  border-radius: 2rem;

  background-color: #f1f4f4;

  ${({ isloading }) =>
    isloading &&
    css`
      background: linear-gradient(90deg, #f1f4f4 25%, #f3f6f6 50%, #f1f4f4 75%);
      animation: ${shimmerAnimation} 1.5s infinite;
      background-size: 200% 100%;
    `}
`;
