import styled from "styled-components";
import NextonLogo from "@/assets/image/SplashLogo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tele = (window as any).Telegram.WebApp;

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.expand(); // Expand the app to full screen
      tele.BackButton.hide();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => navigate("/main"), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SplashWrapper>
      <ScreenWrapper>
        <img src={NextonLogo} alt="splash logo" />
        <RightText>Blockwave Labs Inc. All rights reserved</RightText>
      </ScreenWrapper>
    </SplashWrapper>
  );
};
export default SplashScreen;

const RightText = styled.div`
  color: var(--Dark-surfaces-Dark-surfaces-4, #2e2f3a);
  text-align: center;

  /* Labal/small */
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`;

const ScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  img {
    width: 139.714px;
    height: 165.29px;
    margin-bottom: 222px;
  }
`;

const SplashWrapper = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;
