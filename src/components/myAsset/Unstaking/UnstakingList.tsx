import { styled } from "styled-components";
import IcClaim from "../../../assets/icons/MyAsset/ic_claim.svg";
import IcClaimDisable from "../../../assets/icons/MyAsset/ic_claim_disable.svg";
import IcArrow from "../../../assets/icons/MyAsset/ic_arrow.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const tele = (window as any).Telegram.WebApp;

const UnstakingList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/myasset/nftlist");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <>
      <UnstakingListWrapper>
        <UnstakingListTop>
          <UnstakingMainText>Settled amount</UnstakingMainText>
          <UnstakingTopDesc>This reward is from unstaked NFT.</UnstakingTopDesc>
        </UnstakingListTop>
        <UnstakingListBottom>
          <UnstakingMainText>0 TON</UnstakingMainText>
          <ClaimButton>
            Claim <img src={IcClaimDisable} alt="claim" />
          </ClaimButton>
        </UnstakingListBottom>
      </UnstakingListWrapper>
      <UnstakingDetailBox onClick={() => navigate("/myasset/unstakingdetail")}>
        <UnstakingDetailRightBox>Details</UnstakingDetailRightBox>
        <UnstakingArrowBox>
          <img src={IcArrow} alt="arrow" width={18} />
        </UnstakingArrowBox>
      </UnstakingDetailBox>
    </>
  );
};

export default UnstakingList;

const UnstakingListWrapper = styled.div`
  width: 100%;
  padding: 1.8rem 1.5rem;

  border-radius: 2rem;
  background-color: #fff;
`;

const UnstakingListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 2.2rem;
`;

const UnstakingMainText = styled.span`
  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
const UnstakingTopDesc = styled.span`
  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
`;

const UnstakingListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const ClaimButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;

  padding: 0.7rem 1.2rem;

  border: none;
  border-radius: 2rem;
  background-color: #e8e8ee;
  color: #787881;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};

  outline: none;
  cursor: pointer;
`;

const UnstakingDetailBox = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  margin-top: 0.8rem;
`;

const UnstakingDetailRightBox = styled.div`
  display: flex;
  align-items: center;

  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Footnote};
`;

const UnstakingArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  margin-left: 1rem;

  border-radius: 50%;
  background-color: #e1e1e6;
`;
