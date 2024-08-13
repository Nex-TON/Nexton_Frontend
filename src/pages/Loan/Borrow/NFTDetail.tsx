import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import OngoingNFTLarge from "@/assets/image/Loan/OngoingNFTLarge.png";
import StakingInfo from "@/components/loan/common/StakingInfo";

import {
  NFTDetailCard,
  NFTDetailCardButton,
  NFTDetailCardImageBox,
  NFTDetailCardTitle,
  NFTDetailContentBox,
  NFTDetailItem,
  NFTDetailItemBox,
  NFTDetailItemCaption,
  NFTDetailItemText,
  NFTDetailWrapper,
} from "./NFTDetail.styled";

const tele = (window as any).Telegram.WebApp;

const stakingInfoItems = [
  {
    items: [
      { label: "Principal", value: "10,000 TON" },
      { label: "Nominator Pool", value: "DG Pool #1" },
      { label: "Leveraged", value: "X1.0" },
      { label: "Lockup period", value: "60 days" },
      { label: "Unstakable date", value: "DD.MM.YY" },
      { label: "Protocol Fees", value: "2%" },
      { label: "Staking APR", value: "5%" },
      { label: "Total Amount", value: "10,083 TON" },
    ],
  },
];

// ! Data is currently mocked
const NFTDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const { nftDetail } = useNFTDetail(Number(id));

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

  return (
    <NFTDetailWrapper>
      <NFTDetailCard>
        {/* NFTs are currently hardcoded to be ongoing. This should be changed to a dynamic value. */}
        <NFTDetailCardImageBox>
          <img src={OngoingNFTLarge} alt="ongoing_nft" />
          <span>D-30</span>
        </NFTDetailCardImageBox>

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
            <NFTDetailItemText>95%</NFTDetailItemText>
          </NFTDetailItem>
        </NFTDetailItemBox>

        <StakingInfo isExpandable={true} theme="white" title="Staking info" stakingInfoItems={stakingInfoItems} />
      </NFTDetailContentBox>
    </NFTDetailWrapper>
  );
};

export default NFTDetail;
