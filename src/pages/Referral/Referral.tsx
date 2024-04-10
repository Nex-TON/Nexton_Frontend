import { useState } from "react";
import styled from "styled-components";

import IcCopy from "@/assets/icons/ic_copy.svg";
import ReferralGroup from "@/assets/image/ReferralGroup.png";
import { copyText } from "@/utils/copyText";

const Referral = () => {
  const [referralLink, setReferralLink] = useState<string>("test");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyClick = () => {
    copyText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // reset the state after the animation duration
  };

  return (
    <ReferralWrapper>
      <h1>Referral</h1>

      <img src={ReferralGroup} alt="ReferralGroup" />

      <BottomWrapper>
        <ReferralBoxWrapper>
          <ReferralBox>
            <h3>Your Reward</h3>
            <span>Soon...</span>
          </ReferralBox>
          <ReferralBox>
            <h3>Your Friends</h3>
            <span>Soon...</span>
          </ReferralBox>
        </ReferralBoxWrapper>

        <ReferralBox>
          <ReferralLink>
            <h3>referral/?id=1234</h3>

            <CopyIcon isCopied={isCopied} src={IcCopy} alt="copy" onClick={handleCopyClick} />
          </ReferralLink>
        </ReferralBox>
      </BottomWrapper>
    </ReferralWrapper>
  );
};

export default Referral;

const ReferralWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  padding: 2rem;
  gap: 1.6rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  background: linear-gradient(96deg, #c078f9 5.73%, #6047f4 100%);

  h1 {
    color: #fff;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const ReferralBoxWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ReferralBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 14px 22px;
  border-radius: 20px;

  background-color: #fff;
  color: #000;
  text-align: start;

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
  }
`;

const ReferralLink = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 14px 12px;
  border-radius: 10px;

  color: #fff;
  background: linear-gradient(134deg, #6bd3ff 7.39%, #3461ff 97.6%);
`;

const CopyIcon = styled.img<{ isCopied: boolean }>`
  cursor: pointer;
  animation: ${({ isCopied }) => (isCopied ? "pop 1s ease" : "none")};

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;
