import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Address, toNano } from "@ton/core";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { postUnstake } from "@/api/postUnstake";
import Loader from "@/components/common/Loader";
import { ConfirmUnstakingModal } from "@/components/unstaking/ConfirmUnstakingModal";
import UnstakingPreview from "@/components/unstaking/UnstakingPreview";
import { useUnstakingDetail } from "@/hooks/api/unstaking/useUnstakingDetail";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { globalError } from "@/lib/atom/globalError";
import { telegramAtom } from "@/lib/atom/telegram";
import { UnstakingProps } from "@/types/staking";
import { isDevMode } from "@/utils/isDevMode";
import { limitDecimals } from "@/utils/limitDecimals";
import * as Contract from "@/hooks/contract/transferNFT";

import {
  NFTDetailContentBox,
  NFTDetailItemBox,
  NFTDetailItemCaption,
  NFTDetailItemText,
} from "../MyAsset/NFTDetail/NFTDetail.styled";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "unstake" | "confirmUnstake";
  toggled: boolean;
}

const UnstakingNftDetail = ({ view }: { view?: boolean }) => {
  const { address } = useTonConnect();
  const { id } = useParams();
  const { data: unstakingDetail, isLoading: isLoadingUnstakingDetail, error } = useUnstakingDetail(Number(id));
  const { sendMessage } = Contract.transferNft(id); // ! pass nftAddress instead of id

  const navigate = useNavigate();

  const setError = useSetRecoilState(globalError);
  const telegramId = useRecoilValue(telegramAtom);

  const [isLoading, setIsLoading] = useState(false);
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

  const handleUnstaking = useCallback(async () => {
    setIsLoading(true);

    try {
      const newUnstaking: UnstakingProps = {
        telegramId: Number(telegramId),
        nftId: Number(id),
        address,
      };

      const data = () => {
        return {
          queryId: BigInt(Date.now()),
          value: toNano("0.05"),
          newOwner: Address.parse("UQD__________________________________________xYt"), // NULL ADDRESS
          responseAddress: Address.parse(address),
          fwdAmount: BigInt(0),
        };
      };

      // send nft to null address (burn nft)
      await sendMessage(data(), toNano("0.05"));

      // If sendMessage is successful, then call postStakingInfo
      await postUnstake(newUnstaking);

      navigate("/unstaking/beta");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [setError, address, id, telegramId, navigate]);

  const handleUnstakeConfirm = () => {
    toggleModal();

    handleUnstaking();
  };

  if (error) {
    return (
      <UnstakingWrapper style={{ justifyContent: "space-between" }}>
        <div>
          <UnstakingHeader>Unstaking NFT</UnstakingHeader>
          <UnstakingMessageBox>Error: {error.message}</UnstakingMessageBox>
        </div>

        <UnstakingButton style={{ marginBottom: "1.6rem" }} onClick={() => navigate("/myasset/nftlist")}>
          Go to NFT List
        </UnstakingButton>
      </UnstakingWrapper>
    );
  }

  return (
    <>
      <UnstakingWrapper>
        <UnstakingHeader>Unstaking NFT</UnstakingHeader>

        {isLoadingUnstakingDetail ? (
          <LoaderWrapper>
            <Loader height={100} width={100} />
          </LoaderWrapper>
        ) : (
          <>
            <UnstakingPreview unstakingDetail={unstakingDetail} />

            <NFTDetailContentBox style={{ padding: "2.9rem 0" }}>
              <NFTDetailItemBox>
                <NFTDetailItem>
                  <NFTDetailItemCaption>Principal</NFTDetailItemCaption>
                  <NFTDetailItemText>{limitDecimals(unstakingDetail?.principal, 3)} TON</NFTDetailItemText>
                </NFTDetailItem>
                <NFTDetailItem>
                  <NFTDetailItemCaption>Rewards</NFTDetailItemCaption>
                  <NFTDetailItemText>{limitDecimals(unstakingDetail?.rewards, 3)} TON</NFTDetailItemText>
                </NFTDetailItem>
              </NFTDetailItemBox>

              <NFTDetailItem>
                <NFTDetailItemCaption>State</NFTDetailItemCaption>
                <NFTDetailItemStatus $unstakeState={unstakingDetail?.unstakeState}>
                  {unstakingDetail?.unstakeState == 1 ? "In Progress" : unstakingDetail?.unstakeState == 2?"Completed":"Before Request"}
                </NFTDetailItemStatus>
              </NFTDetailItem>
              <NFTDetailItem>
                <NFTDetailItemCaption>Unstaking period</NFTDetailItemCaption>
                <NFTDetailItemText>{unstakingDetail?.unstakingPeriod} days</NFTDetailItemText>
              </NFTDetailItem>
              <NFTDetailItem>
                <NFTDetailItemCaption>Date of Unstaking</NFTDetailItemCaption>
                <NFTDetailItemText>{new Date(unstakingDetail?.unstakableDate).toLocaleDateString()}</NFTDetailItemText>
              </NFTDetailItem>
            </NFTDetailContentBox>

            <UnstakingMessageBox>During this period you may not cancel the transaction.</UnstakingMessageBox>

            {!view &&
              (isDevMode ? (
                <UnstakingButton onClick={() => setModal({ type: "confirmUnstake", toggled: true })}>
                  Confirm
                </UnstakingButton>
              ) : (
                <MainButton text="Confirm" onClick={() => setModal({ type: "confirmUnstake", toggled: true })} />
              ))}
          </>
        )}
      </UnstakingWrapper>

      {isLoading && (
        <LoaderWrapper>
          <Loader height={100} width={100} />
        </LoaderWrapper>
      )}
      {modal.type === "confirmUnstake" && modal.toggled && (
        <ConfirmUnstakingModal toggleModal={toggleModal} onConfirm={handleUnstakeConfirm} />
      )}
      {/* // ! @deprecated */}
      {/* {modal.type === "unstake" && modal.toggled && (
        <BasicModal
          type="unstaking"
          toggleModal={toggleModal}
          navigateOnClose="/unstaking/beta"
          onClose={async () => {
            await refreshTonData();
          }}
        />
      )} */}
    </>
  );
};

export default UnstakingNftDetail;

const NFTDetailItem= styled.div<{ $marginTop?: boolean; $itemsCenter?: boolean }>`
width: 100%;
display: inline-flex;
padding: 1.3rem 5.6rem 3rem 2.4rem;
flex-direction: column;
align-items: ${({ $itemsCenter }) => ($itemsCenter ? "center" : "flex-start")};
gap: 0.3rem;

border-radius: 1.5rem;
background: #fff;

/* drop shadow_type 4 */
box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

margin-top: ${({ $marginTop }) => ($marginTop ? "3.7rem" : "0")};
`;

const NFTDetailItemStatus = styled.div<{ $unstakeState: number }>`
  color: ${({ $unstakeState }) => ($unstakeState == 2 ?  "#34C759":$unstakeState == 1?"#1F53FF":"#76797A")};
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const UnstakingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  min-height: 100vh;
  padding: 0 1.5rem;
  background-color: white;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
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
