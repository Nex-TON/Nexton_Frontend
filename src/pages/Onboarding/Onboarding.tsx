import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import OnboardingIllust1 from "@/assets/image/Onboarding/onboarding1_illust.svg";
import OnboardingIllust2 from "@/assets/image/Onboarding/onboarding2_illust.svg";
import OnboardingIllust3 from "@/assets/image/Onboarding/onboarding3_illust.svg";

import BackgroundCircle1 from "@/assets/image/Onboarding/onboarding1_circle.svg";
import BackgroundCircle2 from "@/assets/image/Onboarding/onboarding2_circle.svg";
import BackgroundCircle3 from "@/assets/image/Onboarding/onboarding3_circle.svg";

const tele = (window as any).Telegram.WebApp;

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const TextSlide = [
    {
      image: OnboardingIllust1,
      circle: BackgroundCircle1,
      title1: "Stake your TON",
      title2: "with NEXTON!",
      description1: "Stake your TON.",
      description2: "And get the nxTON with the NFT.",
    },
    {
      image: OnboardingIllust2,
      circle: BackgroundCircle2,
      title1: "Stake your TON",
      title2: "with NEXTON!",
      description1: "Stake your TON.",
      description2: "And get the nxTON with the NFT.",
    },
    {
      image: OnboardingIllust3,
      circle: BackgroundCircle3,
      title1: "Stake your TON",
      title2: "with NEXTON!",
      description1: "Stake your TON.",
      description2: "And get the nxTON with the NFT.",
    },
  ];

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.hide();
    }
  }, []);
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    // 터치 시작 시 X 좌표 저장
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX; // 초기화
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 80) {
      if (currentSlide < 2 && deltaX > 0) {
        setCurrentSlide(currentSlide + 1);
      } else if (currentSlide > 0 && deltaX < 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (currentSlide == 2 && deltaX > 0) {
        navigate("/main");
      }
    }
  };

  return (
    <>
      <OnboardingWrapper onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <SkipButton onClick={() => navigate("/main")}>Skip</SkipButton>
        <BackgroundImage index={currentSlide}>
          <img src={TextSlide[currentSlide].circle} />
        </BackgroundImage>
        <IllustWrapper index={currentSlide}>
          <img src={TextSlide[currentSlide].image} />
        </IllustWrapper>
        <BottomBoxWrapper>
          <h3>
            {TextSlide[currentSlide].title1}
            <br />
            {TextSlide[currentSlide].title2}
          </h3>
          <p>
            {TextSlide[currentSlide].description1}
            <br />
            {TextSlide[currentSlide].description2}
          </p>
          <BottomStatusWrapper>
            <ProgressDot>
              {TextSlide.map((_, index) =>
                index === currentSlide ? <DotActive key={index} /> : <DotInActive key={index} />,
              )}
            </ProgressDot>
            <NextButton
              onClick={() => {
                if (currentSlide < 2) {setCurrentSlide(currentSlide + 1)}
                else {navigate("/main")};
              }}
            >
              NEXT
            </NextButton>
          </BottomStatusWrapper>
        </BottomBoxWrapper>
      </OnboardingWrapper>
    </>
  );
};
export default Onboarding;

const expand = keyframes`
    from{
        width: 8px;
    height: 8px;
    }
    to {
    width: 18px;
    height: 8px;
  }
`;
const shrink = keyframes`
  from {
    width: 18px;
    height: 8px;
  }
  to {
    width: 8px;
    height: 8px;
  }
`;

const SkipButton = styled.div`
  color: white;
  position: absolute;
  top: 3rem;
  left: 2rem;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
  animation: ${expand} 0.5s ease forwards;
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
  animation: ${shrink} 0.5s ease forwards;
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

const BackgroundImage = styled.div<{ index: number }>`
  position: absolute;
  right: ${props => (props.index === 0 ? "0" : props.index === 1 ? "none" : "0")};
  left: ${props => (props.index === 0 ? "none" : props.index === 1 ? "0" : "none")};
  bottom: ${props => (props.index === 0 ? "16rem" : props.index === 1 ? "19rem" : "22rem")};
`;

const BottomBoxWrapper = styled.div`
  background-color: white;
  position: absolute;
  bottom: 0rem;
  width: 100%;
  border-radius: 2rem 2rem 0 0;
  padding: 2rem 2.6rem 6.1rem 2rem;
  max-width: 76.8rem;
  height: 28.2rem;

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

const IllustWrapper = styled.div<{ index: number }>`
  margin-left: ${props => (props.index === 0 ? "none" : props.index === 1 ? "4.3rem" : "none")};
  right: ${props => (props.index === 0 ? "3.4rem" : props.index === 2 ? "0" : "none")};
  position: absolute;
  bottom: ${props => (props.index === 0 ? "26.9rem" : props.index === 1 ? "30.4rem" : "15.2rem")};
`;

const OnboardingWrapper = styled.div`
  background-color: #668aff;
  width: 100%;
  max-width: 76.8rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
