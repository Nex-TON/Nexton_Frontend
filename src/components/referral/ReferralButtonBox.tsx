// stake success page 상단에 뜨는 referral 바로가기 배너
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ReferralButton from "@/assets/image/ReferralButton.png";
import NavigateButton from "@/assets/image/NavigateButton.png";
const ReferralButtonBox = () => {
    const navigate=useNavigate();
  return (
    <>
      <ReferralButtonWrapper id="stake success page referral button">
        <ReferralButtonContainer  onClick={()=>navigate('/referral')} id="stake success page referral button">
          <ButtonText id="stake success page referral button">
            You can refer NEXTON to <br /> a friend and earn points!
          </ButtonText>
          <NavigateButtonContainer id="stake success page referral button">
            <img src={NavigateButton} id="stake success page referral button"/>
          </NavigateButtonContainer>
        </ReferralButtonContainer>
      </ReferralButtonWrapper>
    </>
  );
};
export default ReferralButtonBox;

const NavigateButtonContainer = styled.div``;
const ButtonText = styled.div`
  color: #fff;

  /* body text/Large 2 */
  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 152.941% */
`;

const ReferralButtonContainer = styled.div`
  width: 100%;
  aspect-ratio: 17/6;
  height: auto;
  background-image: url(${ReferralButton});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
  border-radius: 20px;
`;

const ReferralButtonWrapper = styled.div``;
