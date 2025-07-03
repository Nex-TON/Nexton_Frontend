import styled from "styled-components";
import bannerImg from "@/assets/image/banner_referral.svg";
import icNavigate from "@/assets/icons/Main/arrow-down-right-sm.svg";

const NewsReferralGuide = () => {
  return (
    <ContainerWrapper onClick={()=>window.open("https://medium.com/@nextonnode/nexton-referral-program-guide-24099a8e9bc8")}>
      <TextWrapper>
        <Title>
          NEXTON Referral
          <br />
          Program Guide
        </Title>
        <Subtitle>
          Read the Full Guide <img src={icNavigate} />
        </Subtitle>
      </TextWrapper>
      <img src={bannerImg} alt="banner image referral" />
    </ContainerWrapper>
  );
};

export default NewsReferralGuide;

const Subtitle = styled.div`
display: flex;
flex-direction: row;
align-items: center;

  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  img {
    width: 24px;
    height: 24px;
  };
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
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  background: var(--gradation, linear-gradient(96deg, #c078f9 5.73%, #6047f4 100%));
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  padding: 12px 10.14px 0 16px;
  background-position: center;
`;
