import { styled } from "styled-components";
import NftPreviewImage from "../components/lerverage/NFTPreview/NftPreviewImage";
import NFTPreviewInfo from "../components/lerverage/NFTPreview/NFTPreviewInfo";
import FooterButton from "../components/common/FooterButton";
import { UserDeposit } from "../hooks/tact_NexTon";
import * as Contract from "../hooks/useNextonContract";
import BasicModal from "../components/common/modals/BasicModal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { stakingAtom, stakingInputAtom } from "../lib/atom/staking";
import { postStakingInfo } from "../api/postStakingInfo";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { createPortal } from "react-dom";

const tele = (window as any).Telegram.WebApp;

const NFTPreview = () => {
  const stakingInfo = useRecoilValue(stakingAtom);
  const stakeInfoReset = useResetRecoilState(stakingAtom);

  const [, setInput] = useRecoilState(stakingInputAtom);
  const { sendMessage } = Contract.useNextonContract();
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  //minting 된 nft 서버 호출
  const handleMinting = async () => {
    const data = (): UserDeposit => {
      return {
        $$type: "UserDeposit",
        queryId: BigInt(Date.now()),
        lockPeriod: BigInt(stakingInfo.lockup),
        leverage: BigInt(stakingInfo.leverage),
      };
    };
    await postStakingInfo({
      id: stakingInfo.id,
      leverage: stakingInfo.leverage,
      address: stakingInfo.address,
      amount: stakingInfo.principal,
      lockPeriod: stakingInfo.lockup.toString(),
      nominator: stakingInfo.nominator,
    });
    await sendMessage(data(), stakingInfo.principal);

    toggleModal();
    setInput("");
    stakeInfoReset();
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/leverage");
      });
    }
    window.scrollTo(0, 0);

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <NFTPreviewWrapper>
      {modal && <BasicModal type="stake" toggleModal={toggleModal} />}
      <NFTPreviewHeader>Staking NFT Preview</NFTPreviewHeader>
      <NftPreviewImage lockup={stakingInfo.lockup} />
      <NFTPreviewInfo stakingInfo={stakingInfo} />
      <NFTPreviewConfirmBox>
        <NFTPreviewConfirmText>
          Please check your NFT details periodically
        </NFTPreviewConfirmText>
        {/* <MainButton text="Confirm" onClick={handleMinting} /> */}
        <FooterButton title="Confirm" onClick={handleMinting} />
      </NFTPreviewConfirmBox>
    </NFTPreviewWrapper>
  );
};

export default NFTPreview;

const NFTPreviewWrapper = styled.div`
  position: relative;

  width: 100%;

  padding: 3.5rem 2.3rem 0 2.3rem;

  @media (max-width: 500px) {
    padding: 3.5rem 1.7rem 0 1.7rem;
  }
`;

const NFTPreviewHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const NFTPreviewConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  text-align: center;
`;
const NFTPreviewConfirmText = styled.span`
  margin-bottom: 1.4rem;

  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
`;
