import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import { DoubleArrows } from "@/components/loan/common/DoubleArrows";
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
} from "./NFTDetail.styled";

const tele = (window as any).Telegram.WebApp;

// ! Data is currently mocked
const NFTDetail = () => {
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
        <BorrowCardButton onClick={() => navigate(`/loan/${id}/borrow/details`)}>
          Borrow nxTON <img src={IcTrendUp} alt="trend_up" />
        </BorrowCardButton>
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
              <DoubleArrows stroke="black" direction="up" />
            </StakingInfoExpandedCloseBox>
          </StakingInfoExpanded>
        ) : (
          <BorrowDetailItem $marginTop $itemsCenter onClick={handleExpandStakingInfo}>
            <BorrowDetailItemText $textCenter>Staking info</BorrowDetailItemText>
            <DoubleArrows stroke="black" direction="down" />
          </BorrowDetailItem>
        )}
      </BorrowDetailWrapper>
    </BorrowWrapper>
  );
};

export default NFTDetail;
