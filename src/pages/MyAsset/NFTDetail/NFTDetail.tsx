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
import { useCheckLendingAvailable } from "@/hooks/api/loan/useCheckLendingAvailable";

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
import useTonConnect from "@/hooks/contract/useTonConnect";
import { address } from "@ton/core";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  toggled: boolean;
}

const NFTDetail = () => {
  const navigate = useNavigate();
  const [nftInfo, setNftInfo] = useState<nftInfo>();
  const [stakingInfo, setStakingInfo] = useState<any>([{ items: [] }]);
  const [isNftExpired, setIsNftExpired] = useState(false);
  const { id } = useParams();
  const {address}=useTonConnect();
  const { nftDetail, isLoading } = useNFTDetail(Number(id));
  const {data:checkLendingAvailable}=useCheckLendingAvailable(address,Number(id));

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(-1);
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
            { label: "Principal", value: `${nftDetail[0].principal} ${nftDetail[0].tokenSort}` },
            { label: "Nominator Pool", value: nftDetail[0].nominator },
            { label: "Leveraged", value: `${nftDetail[0].leverage}x` },
            { label: "Lock-up Period", value: `${nftDetail[0].lockPeriod} days remaining` },
            { label: "Unstakable date", value: new Date(nftDetail[0].unstakableDate).toLocaleDateString() },
            { label: "Protocol Fees", value: "2%" },
            { label: "Total Amount", value: `${numberCutter(nftDetail[0].totalAmount)} ${nftDetail[0].tokenSort}` },
          ],
        },
      ]);
    }
  }, [nftDetail]);

  return (
    <>
      <NFTDetailWrapper>
        <NFTDetailCard>
          {nftInfo?.unstakableDate && (
            <NFTDetailCardImageBox>
              {getNftState(nftInfo.unstakableDate) === "ongoing" ? (
                <img src={OngoingNFTLarge} alt="ongoing_nft" />
              ): (
                <img src={ExpiredNFTLarge} alt="expired_nft" />
              )}

              <span>{getDDayText(nftInfo.unstakableDate)}</span>
            </NFTDetailCardImageBox>
          )}

          <NFTDetailCardTitle>Staking NFT</NFTDetailCardTitle>
          <NFTDetailCardButton
            $disabled={!checkLendingAvailable?.success}
            onClick={() => {checkLendingAvailable?.success? navigate(`/loan/${id}/borrow/details`):""}}
          >
            Borrow nxTON <img src={IcTrendUp} alt="trend_up" />
          </NFTDetailCardButton>

          <NFTDetailCardButton
            $disabled={!isNftExpired}
            onClick={() => isNftExpired && navigate(`/unstaking/${id}`)}
            id="nft detail page unstake now button"
          >
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
              <NFTDetailItemCaption>Token</NFTDetailItemCaption>
              <NFTDetailItemText>{nftInfo?.tokenSort}</NFTDetailItemText>
            </NFTDetailItem>
            <NFTDetailItem>
              <NFTDetailItemCaption>LTV</NFTDetailItemCaption>
              <NFTDetailItemText>95%</NFTDetailItemText>
            </NFTDetailItem>
          </NFTDetailItemBox>
          {/* status로 임의의 값 넣어줌 */}
          <StakingInfo isExpandable={true} theme="white" title="Staking info" stakingInfoItems={stakingInfo}/> 
        </NFTDetailContentBox>
      </NFTDetailWrapper>
    </>
  );
};

export default NFTDetail;
