import { styled } from "styled-components";
import IcSkip from "../assets/icons/Landing/ic_skip.svg";
import TonWallet from "../components/main/TonWallet";
import MainCube from "../assets/image/MainCube.png";

const Onboarding = () => {
  return (
    <>
      <OnboardingWrapper>
        <OnboardingMainTitleBox>NEXTON</OnboardingMainTitleBox>
        <CubeImage src={MainCube} alt="MainCube" />
        <Footer>
          <SkipTextBox>
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
`;
