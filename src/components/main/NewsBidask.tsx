import styled from "styled-components";
import Nexton from "@/assets/image/banner_piggy_nexton.png";
import Bidask from "@/assets/icons/nexton-bidask.svg";
import Cross from "@/assets/icons/ic_cross.svg";

const NewsBidask = () => {
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
        <img src={Bidask} alt="banner image referral" height='39.93px'/>
      </ImageWrapper>
    </ContainerWrapper>
  );
};

export default NewsBidask;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: #FFF;
text-align: center;
font-family: Montserrat;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.442px;
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
  gap: 11.57px;
  padding: 27px 31px 41.393px 31.5px;
background: linear-gradient(
    135deg,              
    #000B2F 0%,         
    #000B2F 54%,
    #16144E 54%, 
    #16144E 100%
  );  display: flex;
  background-position: center;
`;
