import styled, { css } from "styled-components";
import IcReload from "../../assets/icons/MyAsset/ic_reload.svg";
import Icfilter from "../../assets/icons/MyAsset/ic_filter.svg";
import { useEffect, useState } from "react";
import NftItem from "../../components/myAsset/NFT/NftItem";
import NFTFilter from "../../components/myAsset/Filter/NFTFilter";
import { useNavigate } from "react-router-dom";
import useMyAssetFilter from "./hooks/useMyAssetFilter";
import IcCheck from "../../assets/icons/MyAsset/ic_check.svg";

const tele = (window as any).Telegram.WebApp;

const NftList = () => {
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState([true, false]);
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

  const handleSelect = (index: number) => {
    if (index === 1) {
      setIsSelect([true, false]);
    } else {
      setIsSelect([false, true]);
    }
  };

  const handleReload = () => {
    setIsSelect([true, false]);
    setPeriod("Filter");
    setIsOpenFilter(false);
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <NFtListWrapper>
      <NftListHeader>
        {isOpenFilter && (
          <NFTFilter
            activeOpacity={activeOpacity}
            checkPeriod={checkPeriod}
            period={period}
            handleCheckPeriod={handleCheckPeriod}
          />
        )}
        <NFTListHeaderLeft>
          <NFTReloadBox onClick={handleReload}>
            <img src={IcReload} alt="reload" />
          </NFTReloadBox>
          <NFTSelectBox $active={isSelect[0]}>Staked</NFTSelectBox>
          <NFTSelectBox $active={isSelect[1]}>Collateralized</NFTSelectBox>
        </NFTListHeaderLeft>
        <NFTSelectBox onClick={handleToggleFilter}>
          {period}
          {period === "Filter" ? (
            <img src={Icfilter} alt="filter" />
          ) : period === "All" ? (
            <img src={IcCheck} alt="check" />
          ) : (
            <NFTStatus type={period} />
          )}
        </NFTSelectBox>
      </NftListHeader>
      {handlePrintMyAssetFilter()?.filter((item) => item.status !== 2).length >
      0 ? (
        <NFTItemWrapper>
          {handlePrintMyAssetFilter()
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .filter((item) => item.status !== 2)
            .map((item) => (
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
  background-color: #f2f2f7;
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
  padding: 2.5rem;

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
