import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import NFTFilter from "../../components/myAsset/Filter/NFTFilter";
import NftItem from "../../components/myAsset/NFT/NftItem";
import NftEmpty from "@/assets/image/NftList_empty.svg";
import RightNavIc from "@/assets/icons/MyAsset/chevron-right_dartk.svg";

import useMyAssetFilter from "./hooks/useMyAssetFilter";

const tele = (window as any).Telegram.WebApp;

const NftList = () => {
  const navigate = useNavigate();
  const { checkPeriod, handleCheckPeriod, handlePrintMyAssetFilter } = useMyAssetFilter();

  useEffect(() => {
    const tele = (window as any).Telegram.WebApp;
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }

    return () => {
      const tele = (window as any).Telegram.WebApp;
      if (tele) {
        tele.offEvent("backButtonClicked");
      }
    };
  }, [navigate]);

  return (
    <NFtListWrapper>
      <NftListHeader>
        <NFTFilter checkPeriod={checkPeriod} handleCheckPeriod={handleCheckPeriod} />
      </NftListHeader>
      {handlePrintMyAssetFilter()?.filter(item => item.status !== 2).length > 0 ? (
        <NFTItemWrapper>
          {handlePrintMyAssetFilter()
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .map(item => (
              <NftItem key={item.nftId} item={item} />
            ))}
        </NFTItemWrapper>
      ) : (
        <NftListEmpty>
          <img src={NftEmpty} alt="Nft_list_empty" />
          <h2>No results</h2>
          <NftListEmptyLink onClick={() => navigate("/stake/amount")}>
            <div>Let’s move to staking to get new NFT</div>{" "}
            <img src={RightNavIc} alt="nftlist empty navigation icon" style={{ height: "1.6rem", width: "1.6rem",marginBottom:"0px" }} />
          </NftListEmptyLink>
        </NftListEmpty>
      )}
    </NFtListWrapper>
  );
};
export default NftList;

const NftListEmptyLink = styled.div`
  cursor: default;
  div {
    color: #5d5e67;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NftListEmpty = styled.div`
  padding-top: 3.5rem;
  margin-bottom: 15.4rem;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    width: 23.6rem;
    height: 23.6rem;
    margin-bottom: 0.7rem;
  }
  h2 {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
    color: black;
    margin-bottom: 1rem;
  }
`;

const NFtListWrapper = styled.div`
  width: 100%;

  padding: 0 0.6rem;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 3px;
    margin-bottom: 3px;
    background-clip: padding-box;
  }
`;

const NftListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;
  padding: 1rem;

  border-radius: 3rem;
  background-color: white;
`;

const NFTItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(14.2rem, 1fr));
  gap: 1.6rem;

  width: 100%;
  padding: 2.5rem 2.5rem 15.4rem 2.5rem;

  background-color: #fff;

  overflow-y: scroll;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;
