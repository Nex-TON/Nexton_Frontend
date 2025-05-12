import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { mutate } from "swr";
import { Address, beginCell, toNano } from "@ton/core";

import { postStakingInfo } from "@/api/postStakingInfo";
import IcAlertBlue from "@/assets/icons/Stake/ic_alert_blue.svg";
import FooterButton from "@/components/common/FooterButton";
import BasicModal from "@/components/common/Modal/BasicModal";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal";
import ProgressBar from "@/components/stake/common/ProgressBar";
import { ConfirmStakeModal } from "@/components/stake/NFTPreview/ConfirmStakeModal";
import NftPreviewImage from "@/components/stake/NFTPreview/NftPreviewImage";
import NFTPreviewInfo from "@/components/stake/NFTPreview/NFTPreviewInfo";
import * as Contract from "@/hooks/contract/depositTon";
import { TonDeposit } from "@/hooks/contract/wrappers/tact_NexTon";
import { useJettonWallet } from "@/hooks/contract/useJettonWallet";
import { globalError } from "@/lib/atom/globalError";
import { stakingAtom, stakingInputAtom } from "@/lib/atom/staking";
import { isDevMode } from "@/utils/isDevMode";
import useTonConnect from "@/hooks/contract/useTonConnect";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "stake" | "confirmStake";
  toggled: boolean;
}
const NFTPreview = () => {
  const { refreshTonData } = useTonConnect();

  const stakingInfo = useRecoilValue(stakingAtom);
  const stakeInfoReset = useResetRecoilState(stakingAtom);
  const setError = useSetRecoilState(globalError);

  const [, setInput] = useRecoilState(stakingInputAtom);
  const { sendMessage: sendDepositTon, strategyDeposit } = Contract.depositTon();
  const { tokenTransfer, strategyDeposit: strategyTokenDeposit } = useJettonWallet(stakingInfo.tokenSort);
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState<ModalState>({
    type: "confirmStake",
    toggled: false,
  });

  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(prev => ({
      type: prev.type,
      toggled: !prev.toggled,
    }));
  };

  //minting 된 nft 서버 호출
  const handleTonStake = useCallback(async () => {
    setIsLoading(true);

    try {
      if (["Arbitrage Bot", "Arbitrage Bot 1", "Arbitrage Bot 2", "Arbitrage Bot 3"].includes(stakingInfo.nominator)) {
        const data = (): TonDeposit => {
          const PROTOCOL_FEE = toNano(0.1);
          return {
            $$type: "TonDeposit",
            query_id: BigInt(Date.now()),
            amount: toNano(stakingInfo.principal) - PROTOCOL_FEE, // ❗NOTE❗: Not used in the current contract version
            // lockPeriod: BigInt(stakingInfo.lockup),
            // leverage: BigInt(stakingInfo.leverage),
          };
        };

        // First, attempt to send the message to the contract
        await sendDepositTon(data(), stakingInfo.principal);
      } else {
        const data = {
          amount: toNano(stakingInfo.principal),
          strategy: stakingInfo.nominator,
        };
        await strategyDeposit(data, toNano(stakingInfo.principal) + toNano(0.3));
      }

      // If sendMessage is successful, then call postStakingInfo
      await postStakingInfo({
        telegramId: stakingInfo.telegramId,
        leverage: stakingInfo.leverage,
        address: stakingInfo.address,
        amount: stakingInfo.principal,
        lockPeriod: stakingInfo.lockup.toString(),
        nominator: stakingInfo.nominator,
        tokenSort: stakingInfo.tokenSort,
      });

      setModal({ type: "stake", toggled: true });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [stakingInfo, sendDepositTon, setError]);

  const handleStakeConfirm = () => {
    toggleModal();
    if (stakingInfo.tokenSort === "TON") {
      handleTonStake();
    } else {
      handleJettonStake();
    }
  };

  const handleJettonStake = useCallback(async () => {
    setIsLoading(true);
    try {
      if (["Arbitrage Bot", "Arbitrage Bot 1",  "Arbitrage Bot 2", "Arbitrage Bot 3"].includes(stakingInfo.nominator)) {
        const data = (amount: string) => {
          const PROTOCOL_FEE = toNano(0.1);
          return {
            value: PROTOCOL_FEE + toNano("0.1"),
            amount: amount,
            fwdAmount: PROTOCOL_FEE,
            fwdPayload: beginCell().storeBit(false).storeBit(false).endCell().asSlice(),
          };
        };

        // First, attempt to send the message to the contract
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        await tokenTransfer(Address.parse(contractAddress), data(stakingInfo.principal));
      } else {
        await strategyTokenDeposit(stakingInfo.principal, stakingInfo.nominator);
      }

      // If sendMessage is successful, then call postStakingInfo
      await postStakingInfo({
        telegramId: stakingInfo.telegramId,
        leverage: stakingInfo.leverage,
        address: stakingInfo.address,
        amount: stakingInfo.principal,
        lockPeriod: stakingInfo.lockup.toString(),
        nominator: stakingInfo.nominator,
        tokenSort: stakingInfo.tokenSort,
      });

      setModal({ type: "stake", toggled: true });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [stakingInfo, tokenTransfer, setError]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => {
        navigate("/stake/leverage");
      });
    }
    window.scrollTo(0, 0);

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  return (
    <>
      <NFTPreviewWrapper>
        <ProgressBar />
        <NFTPreviewHeaderWrapper>
          <StepBox>Fin.</StepBox>
          <NFTPreviewHeader>
            <NFTPreviewHeaderTop>
              <p>Check info that will</p>
              <p>be noted on your NFT</p>
            </NFTPreviewHeaderTop>
            <NFTPreviewHeaderBottom>
              <p>After this process, transaction cancel should be</p>
              <p>turned down.</p>
            </NFTPreviewHeaderBottom>
          </NFTPreviewHeader>
        </NFTPreviewHeaderWrapper>
        <NftPreviewImage lockup={stakingInfo.lockup} />
        <NFTPreviewInfo stakingInfo={stakingInfo} />
        <NFTPreviewConfirmBox>
          <img src={IcAlertBlue} alt="alertBlue" />
          <div>
            <NFTPreviewConfirmText>You cannot cancel the transaction after pressing</NFTPreviewConfirmText>
            <NFTPreviewConfirmText>Confirm. Please check the NFT information.</NFTPreviewConfirmText>
          </div>

          {!isDevMode ? (
            <MainButton text="Confirm" onClick={() => setModal({ type: "confirmStake", toggled: true })} />
          ) : (
            /* Used for testing */
            <FooterButton title="Confirm" onClick={() => setModal({ type: "confirmStake", toggled: true })} />
          )}
        </NFTPreviewConfirmBox>
      </NFTPreviewWrapper>

      {isLoading && <TransactionConfirmModal />}
      {modal.type === "confirmStake" && modal.toggled && (
        <ConfirmStakeModal toggleModal={toggleModal} onConfirm={handleStakeConfirm} />
      )}
      {modal.type === "stake" && modal.toggled && (
        <BasicModal
          type="stake"
          toggleModal={toggleModal}
          onClose={async () => {
            setInput("");
            stakeInfoReset();

            // Refresh the MyAssets data
            mutate(`/data/getAllStakeInfoByAddress?address=${stakingInfo.address}`);
            await refreshTonData();

            navigate("/stake/success", {
              state: { isStakeSuccess: true, lockPeriod: stakingInfo.lockup, stakingInfo: stakingInfo },
            });
          }}
        />
      )}
    </>
  );
};

export default NFTPreview;

const NFTPreviewWrapper = styled.div`
  position: relative;

  width: 100%;
`;

const NFTPreviewHeaderWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
`;
const NFTPreviewHeader = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const NFTPreviewHeaderTop = styled.div`
  p {
    color: #333;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
  }
`;

const NFTPreviewHeaderBottom = styled.div`
  margin-top: 1rem;

  p {
    color: #1b1e1f;
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
  }
`;

const NFTPreviewConfirmBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.4rem;

  width: 100%;
  margin-bottom: 1.6rem;
`;
const NFTPreviewConfirmText = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;

const StepBox = styled.div`
  width: fit-content;
  padding: 0.7rem 1.2rem;

  border: 0.1rem solid #d0d0e2;
  border-radius: 2rem;

  color: #333;
  font-family: Montserrat;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.4rem; /* 127.273% */
  letter-spacing: 0.0066rem;
`;
