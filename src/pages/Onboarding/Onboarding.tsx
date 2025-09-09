import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import OnboardingIllust1 from "@/assets/image/Onboarding/onboarding1_illust.svg";
import OnboardingIllust2 from "@/assets/image/Onboarding/onboarding2_illust.svg";
import OnboardingIllust3 from "@/assets/image/Onboarding/onboarding3_illust.svg";

import OnboardingBackground from "@/assets/image/Onboarding/OnboardingBackground.svg";

import IcCheck from "@/assets/icons/Onboarding/IcCheck.svg?react";
import { postAgreement } from "@/api/postAgreement";

const tele = (window as any).Telegram.WebApp;

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [agree, setAgree] = useState(false);
  const userId = tele?.initDataUnsafe?.user?.id; //number

  const handleSubmitAgreement = useCallback(async () => {
    localStorage.setItem("agreePrivacyPolicy", "true");
    localStorage.setItem("agreeTermsOfUse", "true");
    window.dispatchEvent(new Event("storage"));

    try {
      const response = await postAgreement({
        userId: userId.toString(),
      });
    } catch (error) {
      console.log("error", error);
    }
    navigate("/main");
  }, [userId]);

  const TextSlide = [
    {
      image: OnboardingIllust1,
      background: OnboardingBackground,
      title1: "Stake your TON",
      title2: "with NEXTON!",
      description1: "Stake your TON.",
      description2: "And get the NxTON with the NFT.",
    },
    {
      image: OnboardingIllust2,
      background: OnboardingBackground,
      title1: "Liquid Stake TON,",
      title2: "Earn with Arb Bot!",
      description1: "Liquid stake TON,",
      description2: "let the Arb bot earn profits!",
    },
    {
      image: OnboardingIllust3,
      background: OnboardingBackground,
      title1: "Unlock NFT in 15 Days,",
      title2: "Start Earning!",
      description1: "Unlock your NFT after 15 days",
      description2: "and start earning profits!",
    },
  ];

  useEffect(() => {
    const preloadImages = () => {
      TextSlide.forEach(slide => {
        const img = new Image();
        img.src = slide.image;
      });
    };
    preloadImages();
  }, []);

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
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
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
        return;
      }
    }
  };

  return (
    <>
      <OnboardingWrapper onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <SkipButton onClick={() => navigate("/main")}>Skip</SkipButton>
        <BackgroundImage>
          <img src={TextSlide[currentSlide].background} />
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
          {currentSlide === 2 && (
            <TermPolicy onClick={() => setAgree(!agree)}>
              <IcCheck
                style={{ marginRight: "11px" }}
                width="24px"
                height="24px"
                fill={agree ? "#1F53FF" : "none"}
                stroke={agree ? "white" : "black"}
              />
              I accept the
              <span onClick={() => window.open("https://blockwavelabs.notion.site/nexton-terms-of-use", "_blank")}>
                Terms of Use
              </span>
              and
              <span onClick={() => window.open("https://blockwavelabs.notion.site/nexton-privacy-policy", "_blank")}>
                Privacy Policy
              </span>
            </TermPolicy>
          )}
          <BottomStatusWrapper>
            <ProgressDot>
              {TextSlide.map((_, index) =>
                index === currentSlide ? <DotActive key={index} /> : <DotInActive key={index} />,
              )}
            </ProgressDot>
            <NextButton
              onClick={() => {
                if (currentSlide < 2) {
                  setTimeout(() => {
                    setCurrentSlide(currentSlide + 1);
                  }, 400);
                } else {
                  handleSubmitAgreement();
                }
              }}
            >
              {currentSlide === 2 ? "START" : "NEXT"}
            </NextButton>
          </BottomStatusWrapper>
        </BottomBoxWrapper>
      </OnboardingWrapper>
    </>
  );
};
export default Onboarding;

const TermPolicy = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small_3};
  color: black;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 1.7rem;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small_3};
    color: #1f53ff;
    margin: 0 3px;

    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-underline-position: from-font;
    cursor: pointer;
  }
`;

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
  z-index: 999;
  color: white;
  position: absolute;
  top: 3rem;
  left: 2rem;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
  animation: ${expand} 0.5s ease forwards;

  display: flex;
  justify-content: start;
  align-items: start;
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
  color: white;
  text-align: center;
  font-family: "SF Pro Display";
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
  width: 100%;
  img {
    width: 100%;
  }

  position: absolute;
  bottom: 23.8rem;
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
  display: flex;

  right: ${props => (props.index === 0 ? "3.4rem" : "none")};
  left: ${props => (props.index === 1 ? "4.3rem" : props.index === 2 ? "50%" : "none")};
  transform: ${props => (props.index === 2 ? "translateX(-50%)" : "none")};

  position: absolute;
  bottom: ${props => (props.index === 1 ? "30.4rem" : props.index === 0 ? "23.8rem" : "23rem")};
  img {
    @media (min-height: 640px) and (max-height: 719px) {
      height: ${props => (props.index === 0 ? "350px" : props.index === 1 ? "333.621px" : "360.884px")};
    }
    @media (min-height: 720px) {
      height: ${props => (props.index === 0 ? "408px" : props.index === 1 ? "367.416px" : "421px")};
    }
    @media (max-height: 639px) {
      height: ${props => (props.index === 0 ? "281px" : props.index === 1 ? "275.267px" : "311.292px")};
    }
  }
`;

const OnboardingWrapper = styled.div`
  background-color: #d0dbff;
  width: 100%;
  max-width: 76.8rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;
