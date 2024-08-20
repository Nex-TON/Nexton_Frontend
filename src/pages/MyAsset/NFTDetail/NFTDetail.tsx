import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcTrendRight from "@/assets/icons/Loan/ic_trend_right.svg";
import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import ExpiredNFTLarge from "@/assets/image/Loan/ExpiredNFTLarge.png";
import ForthComingNFTLarge from "@/assets/image/Loan/ForthcomingNFTLarge.png";
import OngoingNFTLarge from "@/assets/image/Loan/OngoingNFTLarge.png";
import StakingInfo from "@/components/loan/common/StakingInfo";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { nftInfo } from "@/types/Nft";
import { DDayChange } from "@/utils/dateChanger";

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

const NFTDetail = () => {
  const navigate = useNavigate();
  const [nftInfo, setNftInfo] = useState<nftInfo>();
  const [stakingInfo, setStakingInfo] = useState<any>([{ items: [] }]);
  const { id } = useParams();
  const { nftDetail } = useNFTDetail(Number(id));

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

  useEffect(() => {
    if (nftDetail) {
      setNftInfo(nftDetail[0]);

      setStakingInfo([
        {
          items: [
            { label: "Principal", value: `${nftDetail[0].principal} TON` },
            { label: "Nominator Pool", value: nftDetail[0].nominator },
            { label: "Leveraged", value: `${nftDetail[0].leverage}x` },
            { label: "Lockup period", value: `${nftDetail[0].lockPeriod} days` },
            { label: "Unstakable date", value: nftDetail[0].unstakableDate },
            { label: "Protocol Fees", value: "2%" },
            { label: "Staking APR", value: "5%" },
            { label: "Total Amount", value: `${nftDetail[0].totalAmount} TON` },
          ],
        },
      ]);
    }
  }, [nftDetail]);

  // todo: migrate to the unstakableDate from the backend
  const SwitchDDayNftImage = () => {
    if (DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod) > 15) {
      return <img src={OngoingNFTLarge} alt="ongoing_nft" />;
    } else if (DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod) > 0) {
      return <img src={ForthComingNFTLarge} alt="forthcoming_nft" />;
    } else {
      return <img src={ExpiredNFTLarge} alt="expired_nft" />;
    }
  };

  return (
    <NFTDetailWrapper>
      <NFTDetailCard>
        <NFTDetailCardImageBox>
          {SwitchDDayNftImage()}
          {DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod) > 0
            ? `D-${DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod)}`
            : DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod) === 0
              ? `D-Day`
              : `D+${DDayChange(nftInfo?.timeStamp, nftInfo?.lockPeriod) * -1}`}
        </NFTDetailCardImageBox>

        <NFTDetailCardTitle>Staking NFT</NFTDetailCardTitle>
        <NFTDetailCardButton onClick={() => navigate(`/loan/${id}/borrow/details`)}>
          Borrow nxTON <img src={IcTrendUp} alt="trend_up" />
        </NFTDetailCardButton>
        <NFTDetailCardButton $disabled>
          Unstake Now <img src={IcTrendRight} alt="trend_right" />
        </NFTDetailCardButton>
      </NFTDetailCard>

      <NFTDetailContentBox>
        <NFTDetailItem>
          <NFTDetailItemCaption>NFT ID</NFTDetailItemCaption>
          <NFTDetailItemText>{nftInfo?.nftId}</NFTDetailItemText>
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

        <StakingInfo isExpandable={true} theme="white" title="Staking info" stakingInfoItems={stakingInfo} />
      </NFTDetailContentBox>
    </NFTDetailWrapper>
  );
};

export default NFTDetail;
