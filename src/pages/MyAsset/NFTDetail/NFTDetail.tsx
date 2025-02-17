import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IcTrendRight from "@/assets/icons/Loan/ic_trend_right.svg";
import IcTrendUp from "@/assets/icons/Loan/ic_trend_up.svg";
import ExpiredNFTLarge from "@/assets/image/NftExpired.png";
import OngoingNFTLarge from "@/assets/image/NftOngoing.png";
import StakingInfo from "@components/loan/common/StakingInfo";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { nftInfo } from "@/types/Nft";
import { getDDayText, getNftState } from "@/utils/getNftState";
import { numberCutter } from "@/utils/numberCutter";
import { useCheckLendingAvailable } from "@/hooks/api/loan/useCheckLendingAvailable";
import IcTonSymbol from "@/assets/icons/MyAsset/ic_tonSymbol.svg";
import IcNxTonSymbol from "@/assets/icons/MyAsset/ic_nxTonSymbol.svg";
import BasicModal from "@/components/common/Modal/BasicModal";
import { useWalletData } from "@/context/WalletConnectionProvider";

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

interface ModalState {
  type: "blockborrow" | "blockunstake" | "blockborrow100";
  toggled: boolean;
}

const NFTDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nftInfo, setNftInfo] = useState<nftInfo>();
  const [stakingInfo, setStakingInfo] = useState<any>([{ items: [] }]);
  const [isNftExpired, setIsNftExpired] = useState(false);
  const { id } = useParams();
  const { address } = useWalletData();
  const { nftDetail, isLoading } = useNFTDetail(Number(id));
  const { data: checkLendingAvailable } = useCheckLendingAvailable(address, Number(id));
  const [modal, setModal] = useState<ModalState>({
    type: "blockborrow",
    toggled: false,
  });

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

  const toggleModal = () => {
    setModal(prev => ({
      type: prev.type,
      toggled: !prev.toggled,
    }));
  };

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
              ) : (
                <img src={ExpiredNFTLarge} alt="expired_nft" />
              )}

              <span>{getDDayText(nftInfo.unstakableDate)}</span>
            </NFTDetailCardImageBox>
          )}

          <NFTDetailCardTitle>Staking NFT</NFTDetailCardTitle>
          <NFTDetailCardButton
            onClick={() => {
              checkLendingAvailable?.success
                ? navigate(`/loan/${id}/borrow/details`)
                : setModal({ type: "blockborrow", toggled: true });
              /*
              if (Number(id) <= 100) {
                setModal({ type: "blockborrow100", toggled: true });
              } else if (!id || !address) {
                setModal({ type: "blockborrow100", toggled: true });
              } else {
                
              }*/
            }}
            id="nft detail page borrow nxton button"
          >
            Borrow NxTON <img src={IcTrendUp} alt="trend_up" />
          </NFTDetailCardButton>

          <NFTDetailCardButton
            onClick={() => {
              isNftExpired ? navigate(`/unstaking/${id}`) : setModal({ type: "blockunstake", toggled: true });
            }}
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
              <NFTDetailItemText>
                <img src={nftInfo?.tokenSort === "TON" ? IcTonSymbol : IcNxTonSymbol} alt="tonSymbol" />
                {nftInfo?.tokenSort == "nxTON" ? "NxTON" : `${nftInfo?.tokenSort}`}
              </NFTDetailItemText>
            </NFTDetailItem>
            <NFTDetailItem>
              <NFTDetailItemCaption>LTV</NFTDetailItemCaption>
              <NFTDetailItemText>95%</NFTDetailItemText>
            </NFTDetailItem>
          </NFTDetailItemBox>
          {/* status로 임의의 값 넣어줌 */}
          <StakingInfo isExpandable={true} theme="white" title="Staking info" stakingInfoItems={stakingInfo} />
        </NFTDetailContentBox>
      </NFTDetailWrapper>
      {modal.type === "blockborrow100" && modal.toggled && (
        <BasicModal isDark type="blockborrow100" toggleModal={toggleModal} navigateOnClose={`/myasset/${id}`} />
      )}
      {modal.type === "blockborrow" && modal.toggled && (
        <BasicModal isDark type="blockborrow" toggleModal={toggleModal} navigateOnClose={`/myasset/${id}`} />
      )}
      {modal.type === "blockunstake" && modal.toggled && (
        <BasicModal isDark type="blockunstake" toggleModal={toggleModal} navigateOnClose={`/myasset/${id}`} />
      )}
    </>
  );
};

export default NFTDetail;
