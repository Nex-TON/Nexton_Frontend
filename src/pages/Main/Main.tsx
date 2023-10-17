import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { addressState } from "../../lib/atom/address";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import MainMyAssetInfo from "../../components/main/MainMyAssetInfo";
import MainNftView from "../../components/main/NFTView/MainNftView";
import NowUsingMenu from "../../components/main/Menu/NowUsingMenu";
import UpcomingMenu from "../../components/main/Menu/UpcomingMenu";
import JoinCommunity from "../../components/main/Menu/JoinCommunity";

const tele = (window as any).Telegram.WebApp;

const Main = () => {
  const { address } = useTonConnect();
  const [, setTonAddress] = useRecoilState(addressState);
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchHamburger = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (address) {
      setTonAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.hide();
    }
  }, []);

  return (
    <MainWrapper isOpen={isOpen}>
      <Header isOpen={isOpen} handleSwitchHamburger={handleSwitchHamburger} />
      {isOpen ? (
        <>
          <NowUsingMenu />
          <UpcomingMenu />
          <JoinCommunity />
        </>
      ) : (
        <>
          <MainMyAssetInfo />
          <MainBorder />
          <MainNftView />
        </>
      )}
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: auto;
  min-height: 100%;

  background-color: ${({ isOpen }) => (isOpen ? `#f2f2f7` : `#fff`)};
`;

const MainBorder = styled.div`
  width: 100%;
  height: 1rem;

  background-color: #f1f4f4;
`;
