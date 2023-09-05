import styled from "styled-components";
import MainImage from "../assets/image/MainImage.png";
import TonWallet from "../components/main/TonWallet";
import Menu from "../components/main/Menu";
import { useEffect } from "react";

const tele = (window as any).Telegram.WebApp;

const Main = () => {
  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.onEvent("themeChanged");
      tele.themeParams.secondary_bg_color = "#f2f2f2";
      tele.setHeaderColor("secondary_bg_color");
      tele.MainButton.hide();
      tele.BackButton.hide();
    }
  });

  return (
    <MainWrapper>
      <MainImageBox>
        <MainIcon src={MainImage} alt="MainImage" />
        <MainImageTitle>NEXTON</MainImageTitle>
      </MainImageBox>
      <TonWallet />
      <Menu />
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 4.6rem 1.5rem;
`;

const MainImageBox = styled.div`
  position: relative;
`;

const MainIcon = styled.img`
  width: 100%;

  border-radius: 1rem;
`;

const MainImageTitle = styled.span`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Image_Title};
`;
