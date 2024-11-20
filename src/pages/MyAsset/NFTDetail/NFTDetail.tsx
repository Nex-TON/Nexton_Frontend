import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IcTrendRight from "@/assets/icons/Loan/ic_trend_right.svg";
import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import ExpiredNFTLarge from "@/assets/image/NftExpired.png";
import ForthComingNFTLarge from "@/assets/image/NftForthComing.png";
import OngoingNFTLarge from "@/assets/image/NftOngoing.png";
import StakingInfo from "@components/loan/common/StakingInfo";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { nftInfo } from "@/types/Nft";
import { DDayChange } from "@/utils/dateChanger";
import { getDDayText, getNftState } from "@/utils/getNftState";
import { numberCutter } from "@/utils/numberCutter";

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
  const [isNftExpired, setIsNftExpired] = useState(false);
  const { id } = useParams();
  const { nftDetail, isLoading } = useNFTDetail(Number(id));

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
  }, [navigate]);

  useEffect(() => {
    if (nftDetail) {
      setNftInfo(nftDetail[0]);
      setIsNftExpired(getNftState(nftDetail[0].unstakableDate) === "expired");

      setStakingInfo([
        {
          items: [
            { label: "Principal", value: `${nftDetail[0].principal} TON` },
            { label: "Nominator Pool", value: nftDetail[0].nominator },
            { label: "Leveraged", value: `${nftDetail[0].leverage}x` },
            { label: "Lock-up Period", value: `${nftDetail[0].lockPeriod} days remaining` },
            { label: "Unstakable date", value: new Date(nftDetail[0].unstakableDate).toLocaleDateString() },
            { label: "Protocol Fees", value: "2%" },
            { label: "Staking APR", value: "5%" },
            { label: "Total Amount", value: `${numberCutter(nftDetail[0].totalAmount)} TON` },
          ],
        },
      ]);
    }
  }, [nftDetail]);

  return (
    <NFTDetailWrapper>
      <NFTDetailCard>
        {nftInfo?.unstakableDate && (
          <NFTDetailCardImageBox>
            {getNftState(nftInfo.unstakableDate) === "ongoing" ? (
              <img src={OngoingNFTLarge} alt="ongoing_nft" />
            ) : getNftState(nftInfo.unstakableDate) === "forthcoming" ? (
              <img src={ForthComingNFTLarge} alt="forthcoming_nft" />
            ) : (
              <img src={ExpiredNFTLarge} alt="expired_nft" />
            )}

            <span>{getDDayText(nftInfo.unstakableDate)}</span>
          </NFTDetailCardImageBox>
        )}

        <NFTDetailCardTitle>Staking NFT</NFTDetailCardTitle>
        <NFTDetailCardButton $disabled /* onClick={() => navigate(`/loan/${id}/borrow/details`)} */>
          Borrow nxTON <img src={IcTrendUp} alt="trend_up" />
        </NFTDetailCardButton>

        <NFTDetailCardButton $disabled={!isNftExpired} onClick={() => isNftExpired && navigate(`/unstaking/${id}`)} id="nft detail page unstake now button">
          Unstake Now <img src={IcTrendRight} alt="trend_right" id="nft detail page unstake now button" />
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