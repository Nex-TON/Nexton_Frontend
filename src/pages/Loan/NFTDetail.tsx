import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import OngoingNFTLarge from "@/assets/image/Loan/OngoingNFTLarge.png";
import { DoubleArrows } from "@/components/loan/common/DoubleArrows";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";

import {
  NFTDetailCard,
  NFTDetailCardButton,
  NFTDetailCardTitle,
  NFTDetailContentBox,
  NFTDetailItem,
  NFTDetailItemBox,
  NFTDetailItemCaption,
  NFTDetailItemText,
  NFTDetailWrapper,
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
    <NFTDetailWrapper>
      <NFTDetailCard>
        {/* NFTs are currently hardcoded to be ongoing. This should be changed to a dynamic value. */}
        {true === "ongoing" ? (
          <img src={OngoingNFTLarge} alt="nft" />
        ) : false === "forthComing" ? (
          <img src={OngoingNFTLarge} alt="nft" />
        ) : (
          <img src={OngoingNFTLarge} alt="nft" />
        )}

        <NFTDetailCardTitle>Staking NFT</NFTDetailCardTitle>
        <NFTDetailCardButton onClick={() => navigate(`/loan/${id}/borrow/details`)}>
          Borrow nxTON <img src={IcTrendUp} alt="trend_up" />
        </NFTDetailCardButton>
      </NFTDetailCard>

      <NFTDetailContentBox>
        <NFTDetailItem>
          <NFTDetailItemCaption>Token ID</NFTDetailItemCaption>
          <NFTDetailItemText>542394817863ddddddddd</NFTDetailItemText>
        </NFTDetailItem>

        <NFTDetailItemBox>
          <NFTDetailItem>
            <NFTDetailItemCaption>Network</NFTDetailItemCaption>
            <NFTDetailItemText>TON</NFTDetailItemText>
          </NFTDetailItem>
          <NFTDetailItem>
            <NFTDetailItemCaption>LTV</NFTDetailItemCaption>
            <NFTDetailItemText>50%</NFTDetailItemText>
          </NFTDetailItem>
        </NFTDetailItemBox>

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
          <NFTDetailItem $marginTop $itemsCenter onClick={handleExpandStakingInfo}>
            <NFTDetailItemText $textCenter>Staking info</NFTDetailItemText>
            <DoubleArrows stroke="black" direction="down" />
          </NFTDetailItem>
        )}
      </NFTDetailContentBox>
    </NFTDetailWrapper>
  );
};

export default NFTDetail;
