import { css, keyframes, styled } from "styled-components";
import { useStakeInfo } from "../../../hooks/api/useStakeInfo";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import MainNftViewItem from "./MainNftViewItem";

const MainNftViewList = () => {
  const { address, connected } = useTonConnect();
  const { nftList, isLoading } = useStakeInfo(address);

  return isLoading ? (
    <MainNftViewListWrapper>
      <EmptyNftItem isloading={isLoading} />
      <EmptyNftItem isloading={isLoading} />
      <EmptyNftItem isloading={isLoading} />
    </MainNftViewListWrapper>
  ) : nftList.filter((nft) => nft.status !== 2).length === 0 || !connected ? (
    <MainNftViewListWrapper>
      <EmptyNftItem />
      <EmptyNftItem />
      <EmptyNftItem />
    </MainNftViewListWrapper>
  ) : (
    <MainNftViewListWrapper>
      {nftList
        .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
        .filter((nft) => nft.status !== 2)
        .slice(0, 3)
        .map((nft, index) => (
          <MainNftViewItem key={index} nftItem={nft} />
        ))}
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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;

  width: 100%;
  margin: 2.1rem 0;
`;

const EmptyNftItem = styled.div<{ isloading?: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
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
