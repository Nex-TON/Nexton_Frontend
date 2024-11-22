import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import OnboardingIllust from "@/assets/image/Onboarding/onboarding3_illust.svg";
import BackgroundCircle from "@/assets/image/Onboarding/onboarding3_circle.svg";
import { useEffect } from "react";

const tele=(window as any).Telegram.WebApp;

const Onboarding3 = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(tele){
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked",()=>{
        navigate("/onboarding2");
      });
    }
    return()=>{
      tele.offEvent("backButtonClicked");
    };
  },[]);

  return (
    <>
      <OnboardingWrapper>
        <SkipButton onClick={() => navigate("/main")}>Skip</SkipButton>
        <BackgroundImage>
          <img src={BackgroundCircle} alt="background circle" />
        </BackgroundImage>
        <IllustWrapper>
          <img src={OnboardingIllust} alt="onboarding page 1 illust" />
        </IllustWrapper>
        <BottomBoxWrapper>
          <h3>
            Stake your TON
            <br />
            with NEXTON!
          </h3>
          <p>
            Stake your TON.
            <br />
            And get the nxTON with the NFT.
          </p>
          <BottomStatusWrapper>
            <ProgressDot>
              <DotActive/>
              <DotInActive/>
              <DotInActive/>
            </ProgressDot>
            <NextButton onClick={() => navigate("/main")}>NEXT</NextButton>
          </BottomStatusWrapper>
        </BottomBoxWrapper>
      </OnboardingWrapper>
    </>
  );
};
export default Onboarding3;

const SkipButton = styled.div`
  color: white;
  position: absolute;
  top: 3rem;
  left: 2rem;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
`;

const DotActive = styled.div`
  width: 18px;
  height: 8px;
  border-radius: 20px;
  background: var(--Neutral-Neutural-10, #1b1e1f);
`;
const DotInActive = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 20px;
  background: var(--Neutral-Neutural-80, #c6caca);
`;

const BottomStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NextButton = styled.div`
  background-color: #1f53ff;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 12.1rem;
  height: 5rem;
  border-radius: 1.2rem;

  //font
  color: var(--iOS-Light-Button-Text-Color, #fff);
  text-align: center;
  font-family: "SF Pro";
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.442px;
`;

const ProgressDot = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const BackgroundImage = styled.div`
  position: absolute;
  right: 0;
  top: 14rem;
`;

const BottomBoxWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 43.3rem;
  width: 100%;
  height: calc(100% - 43.3rem);
  border-radius: 2rem 2rem 0 0;
  padding: 2rem 2.6rem 2rem;

  h3 {
    color: #000;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 30px */
    letter-spacing: -0.46px;
    margin-bottom: 1.3rem;
  }
  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    margin-bottom: 2.8rem;
  }
`;

const IllustWrapper = styled.div`
  position: absolute;
  top: 6rem;
  img {
    width: 411.5px;
    height: 503.216px;
  }
`;

const OnboardingWrapper = styled.div`
  background-color: #668aff;
  width: 100%;
  max-width: 76.8rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
