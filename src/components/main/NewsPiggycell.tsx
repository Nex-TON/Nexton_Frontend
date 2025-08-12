import styled from "styled-components";
import Nexton from "@/assets/image/banner_piggy_nexton.png";
import Piggy from "@/assets/image/banner_piggy.svg";
import Cross from "@/assets/icons/ic_cross.svg";

const NewsPiggycell = () => {
  return (
    <ContainerWrapper
      onClick={() => window.open("https://x.com/NextonNode/status/1952293620666540364")}
    >
      <TextWrapper>
        <Title>PARTNERSHIP ANNOUNCEMENT</Title>
      </TextWrapper>
      <ImageWrapper>
        <img src={Nexton} alt="banner image referral" height='18px'/>
        <img src={Cross} alt="banner image referral" height='12px'/>
        <img src={Piggy} alt="banner image referral" height='29.607px'/>
      </ImageWrapper>
    </ContainerWrapper>
  );
};

export default NewsPiggycell;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const Title = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 27px */
  text-align: start;
  margin-top: 1rem;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 4.5px;
`;

const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding-top: 17px;
  background: #0a0b0d;
  display: flex;
  background-position: center;
`;
