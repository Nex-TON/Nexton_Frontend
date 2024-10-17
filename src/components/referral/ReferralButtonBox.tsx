import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import NextonLogo from "@/assets/image/ReferralButtonLogo.png";
import ReferralButton from "@/assets/image/ReferralButton.png";
import NavigateButton from "@/assets/image/NavigateButton.png";
const ReferralButtonBox = () => {
    const navigate=useNavigate();
  return (
    <>
      <ReferralButtonWrapper>
        <ReferralButtonContainer>
          <ButtonText>
            You can refer NEXTON to <br /> a friend and earn points!
          </ButtonText>
          <NavigateButtonContainer onClick={()=>navigate('/referral')}>
            <img src={NavigateButton} />
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
