import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { randomAddress } from "@ton/test-utils";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { postUnstake } from "@/api/postUnstake";
import BasicModal from "@/components/common/Modal/BasicModal";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal";
import UnstakingPreview from "@/components/myAsset/NFT/Unstaking/UnstakingPreview";
import { ConfirmUnstakingModal } from "@/components/unstaking/ConfirmUnstakingModal";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { Transfer } from "@/hooks/contract/wrappers/tact_FakeItem";
import { telegramAtom } from "@/lib/atom/telegram";
import { UnstakingProps } from "@/types/staking";
import { isDevMode } from "@/utils/isDevMode";

import {
  NFTDetailContentBox,
  NFTDetailItem,
  NFTDetailItemBox,
  NFTDetailItemCaption,
  NFTDetailItemText,
} from "../MyAsset/NFTDetail/NFTDetail.styled";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "unstake" | "confirmUnstake";
  toggled: boolean;
}

const UnstakingNftDetail = () => {
  const telegramId = useRecoilValue(telegramAtom);
  const { address } = useTonConnect();
  // const { sendMessage } = Contract.useFakeItemContract();
  const { id } = useParams();
  const { nftDetail, isLoading: isLoadingNftDetail } = useNFTDetail(Number(id));
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoadingUnstake, setIsLoadingUnstake] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    type: "confirmUnstake",
    toggled: false,
  });

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(`/myasset/nftlist`);
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

  const postUnstaking = async () => {
    setIsLoadingUnstake(true);
    setTimeout(() => {
      console.log("postUnstaking");
      setModal({ type: "unstake", toggled: true });
      setIsLoadingUnstake(false);
    }, 1000);

    // todo: connect contract & API
    /* if (address && nftDetail) {
      const newUnstaking: UnstakingProps = {
        telegramId: Number(telegramId),
        nftId: Number(id),
        address,
      };

      const data = (): Transfer => {
        return {
          $$type: "Transfer",
          newOwner: randomAddress(),
        };
      };

      await sendMessage(data(), `${nftDetail.principal}`);
      const response = await postUnstake(newUnstaking);
      if (response === 200) {
        setModal({ type: "unstake", toggled: true });
        navigate(`/unstaking/beta`);
      }
    } */
  };

  const handleUnstakeConfirm = () => {
    toggleModal();

    postUnstaking();
  };

  return (
    <>
      <UnstakingWrapper>
        <UnstakingHeader>Unstaking NFT</UnstakingHeader>

        <UnstakingPreview nftDetail={nftDetail[0]} />

        {/* <UnstakingInfo item={nftDetail} /> */}

        <NFTDetailContentBox style={{ padding: "2.9rem 0" }}>
          <NFTDetailItemBox>
            <NFTDetailItem>
              <NFTDetailItemCaption>Principal</NFTDetailItemCaption>
              <NFTDetailItemText>{nftDetail[0]?.principal} TON</NFTDetailItemText>
            </NFTDetailItem>
            <NFTDetailItem>
              <NFTDetailItemCaption>Rewards</NFTDetailItemCaption>
              <NFTDetailItemText>0.000 TON</NFTDetailItemText>
            </NFTDetailItem>
          </NFTDetailItemBox>

          <NFTDetailItem>
            <NFTDetailItemCaption>Available in</NFTDetailItemCaption>
            <NFTDetailItemText>{nftDetail[0]?.unstakableDate}</NFTDetailItemText>
          </NFTDetailItem>
          <NFTDetailItem>
            <NFTDetailItemCaption>Unstaking period</NFTDetailItemCaption>
            <NFTDetailItemText>14 days</NFTDetailItemText>
          </NFTDetailItem>
          <NFTDetailItem>
            <NFTDetailItemCaption>Date of Unstaking</NFTDetailItemCaption>
            <NFTDetailItemText>{nftDetail[0]?.unstakableDate}</NFTDetailItemText>
          </NFTDetailItem>
        </NFTDetailContentBox>

        <UnstakingMessageBox>During this period you may not cancel the transaction.</UnstakingMessageBox>

        {isDevMode ? (
          <UnstakingButton onClick={() => setModal({ type: "confirmUnstake", toggled: true })}>Confirm</UnstakingButton>
        ) : (
          <MainButton text="Confirm" onClick={() => setModal({ type: "confirmUnstake", toggled: true })} />
        )}
      </UnstakingWrapper>

      {isLoadingUnstake && <TransactionConfirmModal isDark={false} />}
      {modal.type === "confirmUnstake" && modal.toggled && (
        <ConfirmUnstakingModal toggleModal={toggleModal} onConfirm={handleUnstakeConfirm} />
      )}
      {modal.type === "unstake" && modal.toggled && (
        <BasicModal type="unstaking" toggleModal={toggleModal} onClose={() => console.log("Unstaked!")} />
      )}
    </>
  );
};

export default UnstakingNftDetail;

const UnstakingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  padding: 0 1.5rem;
  background-color: #f2f2f7;
`;
const UnstakingHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 100%;
  padding-top: 2.9rem;
  padding-bottom: 1.8rem;

  color: #0f0f0f;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px; /* 170% */
`;

const UnstakingMessageBox = styled.div`
  width: 100%;
  margin-top: 4.3rem;
  margin-bottom: 2.4rem;

  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_1};
  text-align: center;
`;

const UnstakingButtonWrapper = styled.div`
  width: 100%;
  padding: 0 1.6rem;
`;

const UnstakingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  outline: none;
  cursor: pointer;
`;
