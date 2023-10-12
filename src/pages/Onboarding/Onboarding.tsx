import { styled } from "styled-components";
import IcSkip from "../../assets/icons/Landing/ic_skip.svg";
import MainCube from "../../assets/image/MainCube.png";
import TonWallet from "../../components/main/TonWallet";
import { useNavigate } from "react-router-dom";
import IcSplashTop from "../../assets/icons/Landing/ic_splash_top.svg";
import IcSplashBottom from "../../assets/icons/Landing/ic_splash_bottom.svg";
import { useEffect } from "react";

const tele = (window as any).Telegram.WebApp;

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.MainButton.hide();
      tele.BackButton.hide();
    }
  });

  return (
    <>
      <OnboardingWrapper>
        <LineImage src={IcSplashTop} alt="topLine" $position="top" />
        <LineImage src={IcSplashBottom} alt="bottomLine" $position="bottom" />
        <OnboardingMainTitleBox>NEXTON</OnboardingMainTitleBox>
        <CubeImage src={MainCube} alt="MainCube" />
        <Footer>
          <SkipTextBox onClick={() => navigate("/main")}>
            Skip
            <img src={IcSkip} alt="skip" />
          </SkipTextBox>
          <TonWallet />
        </Footer>
      </OnboardingWrapper>
    </>
  );
};

export default Onboarding;

const OnboardingWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100%;

  background-color: #008aff;
`;

const OnboardingMainTitleBox = styled.div`
  width: 100%;
  padding-top: 5.364rem;

  color: #fff;
  font-family: Montserrat;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3rem; /* 100% */
  letter-spacing: -0.15px;

  text-align: center;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 76.8rem;
  padding: 0 2.3rem 3.7rem 2.3rem;

  z-index: 1;
`;

const SkipTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  width: 100%;
  padding-left: 1.5rem;
  margin-bottom: 1.2rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};

  cursor: pointer;
`;

const CubeImage = styled.img`
  position: absolute;
  right: 0;

  width: 100%;
`;

const LineImage = styled.img<{ $position: string }>`
  position: absolute;
  bottom: ${({ $position }) => ($position === "top" ? "15rem" : "0rem")};

  z-index: ${({ $position }) => $position === "top" && "1"};

  width: 100%;
`;
