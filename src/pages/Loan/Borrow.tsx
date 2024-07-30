import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcDoubleArrowsBottom from "@/assets/icons/Loan/ic_double_arrows_bottom.svg";
import IcDoubleArrowsTop from "@/assets/icons/Loan/ic_double_arrows_top.svg";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";

import {
  BorrowCard,
  BorrowCardButton,
  BorrowCardTitle,
  BorrowDetailItem,
  BorrowDetailItemBox,
  BorrowDetailItemCaption,
  BorrowDetailItemText,
  BorrowDetailWrapper,
  BorrowWrapper,
  NFTStatus,
  StakingInfoExpanded,
  StakingInfoExpandedCloseBox,
  StakingInfoExpandedDivider,
  StakingInfoExpandedHeader,
  StakingInfoExpandedItem,
} from "./Borrow.styled";

const tele = (window as any).Telegram.WebApp;

// ! Data is currently mocked
const Borrow = () => {
  const [isStakingExpanded, setIsStakingExpanded] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useNFTDetail(Number(id));

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  const handleExpandStakingInfo = () => {
    setIsStakingExpanded(!isStakingExpanded);
  };

  return (
    <BorrowWrapper>
      <BorrowCard>
        <NFTStatus type="ongoing" />

        <BorrowCardTitle>Staking NFT</BorrowCardTitle>
        <BorrowCardButton>Borrow nxTON &rarr;</BorrowCardButton>
      </BorrowCard>

      <BorrowDetailWrapper>
        <BorrowDetailItem>
          <BorrowDetailItemCaption>Token ID</BorrowDetailItemCaption>
          <BorrowDetailItemText>542394817863ddddddddd</BorrowDetailItemText>
        </BorrowDetailItem>

        <BorrowDetailItemBox>
          <BorrowDetailItem>
            <BorrowDetailItemCaption>Network</BorrowDetailItemCaption>
            <BorrowDetailItemText>TON</BorrowDetailItemText>
          </BorrowDetailItem>
          <BorrowDetailItem>
            <BorrowDetailItemCaption>LTV</BorrowDetailItemCaption>
            <BorrowDetailItemText>50%</BorrowDetailItemText>
          </BorrowDetailItem>
        </BorrowDetailItemBox>

        {isStakingExpanded ? (
          <StakingInfoExpanded $marginTop>
            <StakingInfoExpandedHeader $textCenter>Staking info</StakingInfoExpandedHeader>

            <StakingInfoExpandedItem>
              <span>Principal</span>
              <p>10,000 TON</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Nominator Pool</span>
              <p>DG Pool #1</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Leveraged</span>
              <p>X1.0</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Lockup period</span>
              <p>60 days</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Unstakable date</span>
              <p>DD.MM.YY</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Protocol Fees</span>
              <p>2%</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Staking APR</span>
              <p>5%</p>
            </StakingInfoExpandedItem>
            <StakingInfoExpandedDivider />
            <StakingInfoExpandedItem>
              <span>Total Amount</span>
              <p>10,083 TON</p>
            </StakingInfoExpandedItem>

            <StakingInfoExpandedCloseBox onClick={handleExpandStakingInfo}>
              <img src={IcDoubleArrowsTop} alt="arrows_top" />
            </StakingInfoExpandedCloseBox>
          </StakingInfoExpanded>
        ) : (
          <BorrowDetailItem $marginTop $itemsCenter onClick={handleExpandStakingInfo}>
            <BorrowDetailItemText $textCenter>Staking info</BorrowDetailItemText>
            <img src={IcDoubleArrowsBottom} alt="arrows_bottom" />
          </BorrowDetailItem>
        )}
      </BorrowDetailWrapper>
    </BorrowWrapper>
  );
};

export default Borrow;

{
  /* <BorrowDetailWrapper>
        {isOpenModal && <BasicModal type="loan" toggleModal={handleToggleModal} />}
         <BorrowDetailHeader>
          <BackButton type="detail" handleMoveLoan={handleMoveLoan} loan />
          Borrow NXT
        </BorrowDetailHeader>
        <BorrowDetailInfo />

        <MainButton text="Confirm" onClick={handleToggleModal} />
         <ConfirmButton onClick={handleToggleModal}>Confirm</ConfirmButton>
      </BorrowDetailWrapper> */
}
