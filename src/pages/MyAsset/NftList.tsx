import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import NFTFilter from "../../components/myAsset/Filter/NFTFilter";
import NftItem from "../../components/myAsset/NFT/NftItem";

import useMyAssetFilter from "./hooks/useMyAssetFilter";

const tele = (window as any).Telegram.WebApp;

const NftList = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // 선택된 필터 상태
  const navigate = useNavigate();
  const {
    isOpenFilter,
    activeOpacity,
    checkPeriod,
    period,
    setPeriod,
    setIsOpenFilter,
    handleCheckPeriod,
    handlePrintMyAssetFilter,
    handleToggleFilter,
  } = useMyAssetFilter();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/main");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <NFtListWrapper>
      <NftListHeader>
        <NFTFilter />
      </NftListHeader>
      {handlePrintMyAssetFilter()?.filter(item => item.status !== 2).length > 0 ? (
        <NFTItemWrapper>
          {handlePrintMyAssetFilter()
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .filter(item => item.status !== 2)
            .map(item => (
              <NftItem key={item.nftId} item={item} />
            ))}
        </NFTItemWrapper>
      ) : (
        <ExtraBox>Empty</ExtraBox>
      )}
    </NFtListWrapper>
  );
};

export default NftList;

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

const NFTListHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const NFTReloadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;

const NFTSelectBox = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.8rem 1.4rem;

  border: none;
  border-radius: 2rem;
  background-color: #f9f9ff;

  ${({ theme }) => theme.fonts.Nexton_Label_Small};

  ${({ $active }) =>
    $active
      ? css`
          background-color: #333;
          color: #fff;
        `
      : css`
          background-color: #fff;
          color: #5d5e67;
        `}

  outline: none;
  cursor: pointer;
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

const ExtraBox = styled.div`
  width: 100%;
  margin-top: 5.6rem;

  color: #2f3038;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};

  text-align: center;
`;

const NFTStatus = styled.div<{ type?: string }>`
  width: 1.4rem;
  height: 1.4rem;

  border-radius: 50%;
  ${({ type }) =>
    type === "Ongoing" &&
    css`
      background: linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%);
    `}
  ${({ type }) =>
    type === "Forthcoming" &&
    css`
      background: linear-gradient(140deg, #ff8c73 0%, #ffe0b0 100%);
    `}
      ${({ type }) =>
    type === "Expired" &&
    css`
      background: linear-gradient(127deg, #a2a9bc 0%, #e5edff 100%);
    `}
`;
