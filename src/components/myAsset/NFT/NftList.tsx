import styled, { css } from "styled-components";
import IcReload from "../../../assets/icons/MyAsset/ic_reload.svg";
import Icfilter from "../../../assets/icons/MyAsset/ic_filter.svg";
import { useEffect, useState } from "react";
import NftItem from "./NftItem";
import NFTFilter from "../modal/NFTFilter";
import { useNavigate } from "react-router-dom";
import useMyAssetFilter from "../../../pages/MyAsset/hooks/useMyAssetFilter";
import IcCheck from "../../../assets/icons/MyAsset/ic_check.svg";

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
    setPeriod("Period");
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
          <NFTSelectBox $active={isSelect[0]}>Stake</NFTSelectBox>
          <NFTSelectBox $active={isSelect[1]}>Collateralized</NFTSelectBox>
        </NFTListHeaderLeft>
        <NFTSelectBox $active onClick={handleToggleFilter}>
          {period}
          {period === "Period" ? (
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
        <ExtraBox>
          <span>Empty NFT</span>
        </ExtraBox>
      )}
    </NFtListWrapper>
  );
};

export default NftList;

const NFtListWrapper = styled.div`
  width: 100%;

  padding: 0 1.6rem;

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
  padding: 1.2rem;

  border-radius: 1rem 1rem 0 0;
  background-color: #f9f9ff;
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
  background-color: #f9f9ff;
  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);
`;

const NFTSelectBox = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 0.6rem 1rem;

  border: 0.1rem solid #f2f2f7;
  border-radius: 2rem;
  background-color: #f9f9ff;

  ${({ theme }) => theme.fonts.Telegram_Footnote};

  ${({ $active }) =>
    $active
      ? css`
          border: none;
          background-color: #f9f9ff;
          box-shadow: 0px 0px 14px 0px rgba(206, 216, 225, 0.8);
          color: #5e6162;
        `
      : css`
          border: 0.1rem solid #f2f2f7;
          background-color: #f9f9ff;
          color: #90909a;
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  border-radius: 0 0 1rem 1rem;
  background-color: #fff;
  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
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
