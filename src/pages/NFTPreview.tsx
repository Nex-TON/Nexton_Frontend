import { styled } from "styled-components";
import Icback from "../../../assets/icons/ic_back.svg";
import NftPreviewImage from "../components/lerverage/NFTPreview/NftPreviewImage";
import NFTPreviewInfo from "../components/lerverage/NFTPreview/NFTPreviewInfo";
import FooterButton from "../components/common/FooterButton";
import { UserDeposit } from "../hooks/tact_NexTon";
import * as Contract from "../hooks/useNextonContract";
import BasicModal from "../components/modals/BasicModal";
import { useEffect, useState } from "react";
import BackButton from "../components/common/BackButton";
import { useRecoilValue } from "recoil";
import { stakingAtom } from "../lib/atom/staking";
import { postStakingInfo } from "../api/postStakingInfo";
import { useNavigate } from "react-router-dom";

const tele = (window as any).Telegram.WebApp;

const NFTPreview = () => {
  const stakingInfo = useRecoilValue(stakingAtom);

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
        lockPeriod: 0n,
        leverage: 0n,
      };
    };
    await sendMessage(data(), stakingInfo.principal);
    await postStakingInfo({
      id: stakingInfo.id,
      leverage: stakingInfo.leverage,
      address: stakingInfo.address,
      amount: stakingInfo.principal,
      lockPeriod: stakingInfo.lockup.toString(),
    });
    toggleModal();
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
      {modal && <BasicModal toggleModal={toggleModal} />}
      <NFTPreviewHeader>
        {/* <BackButton margin handleMovePreview={handleMovePreview} /> */}
        Staking NFT Preview
      </NFTPreviewHeader>
      <NftPreviewImage lockup={stakingInfo.lockup} />
      <NFTPreviewInfo stakingInfo={stakingInfo} />
      <NFTPreviewConfirmBox>
        <NFTPreviewConfirmText>
          Please check your NFT details periodically
        </NFTPreviewConfirmText>
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
  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
`;
