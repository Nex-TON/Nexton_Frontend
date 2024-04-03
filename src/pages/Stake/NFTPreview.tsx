import { styled } from "styled-components";
import NftPreviewImage from "../../components/stake/NFTPreview/NftPreviewImage";
import NFTPreviewInfo from "../../components/stake/NFTPreview/NFTPreviewInfo";
import FooterButton from "../../components/common/FooterButton";
import { UserDeposit } from "../../hooks/contract/wrappers/tact_NexTon";
import * as Contract from "../../hooks/contract/depositTon";
import BasicModal, {
  LoaderModal,
} from "../../components/common/Modal/BasicModal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { stakingAtom, stakingInputAtom } from "../../lib/atom/staking";
import { postStakingInfo } from "../../api/postStakingInfo";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import ProgressBar from "../../components/stake/common/ProgressBar";
import IcAlertBlue from "../../assets/icons/Stake/ic_alert_blue.svg";
import { isDevMode } from "../../utils/isDevMode";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;

// Supabase client - IMPORTANT: RLS policy is disabled for the "Users" table
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

const tele = (window as any).Telegram.WebApp;

const NFTPreview = () => {
  const stakingInfo = useRecoilValue(stakingAtom);
  const stakeInfoReset = useResetRecoilState(stakingAtom);

  const [, setInput] = useRecoilState(stakingInputAtom);
  const { sendMessage } = Contract.depositTon();
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  //minting 된 nft 서버 호출
  //❗NOTE❗: handleMinting is disabled in a demo version
  /* const handleMinting = async () => {
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
  }; */

  const handleMintingDemo = async () => {
    setIsLoading(true);

    // Send the staking info to the Supabase database
    let { data: Users, error: readError } = await supabase
      .from("Users")
      .select("wallet_address");

    const isWalletExist = Users?.find(
      (el) => el.wallet_address === stakingInfo.address
    );

    if (!isWalletExist && stakingInfo.address) {
      const { data, error: insertError } = await supabase
        .from("Users")
        .insert([{ wallet_address: stakingInfo.address, assets_staked: true }])
        .select();
    }

    // Updated the total staked amount in the local storage
    const stakedLocally = localStorage.getItem("staked");
    const principalAsNumber = Number(stakingInfo.principal);

    if (!isNaN(principalAsNumber)) {
      const totalStaked = stakedLocally
        ? Number(stakedLocally) + principalAsNumber
        : principalAsNumber;

      localStorage.setItem("staked", totalStaked.toFixed(2).toString());
    } else {
      console.error("Invalid principal amount provided.");
    }

    setIsLoading(false);

    toggleModal();
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/stake/leverage");
      });
    }
    window.scrollTo(0, 0);

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <NFTPreviewWrapper>
      {modal && (
        <BasicModal
          type="stake"
          toggleModal={toggleModal}
          onClose={() => {
            setInput("");
            stakeInfoReset();
          }}
        />
      )}
      {isLoading && <LoaderModal />}
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
          <NFTPreviewConfirmText>
            You cannot cancel the transaction after pressing
          </NFTPreviewConfirmText>
          <NFTPreviewConfirmText>
            Confirm. Please check the NFT information.
          </NFTPreviewConfirmText>
        </div>

        {!isDevMode ? (
          <MainButton text="Confirm" onClick={handleMintingDemo} />
        ) : (
          /* Used for testing */
          <FooterButton title="Confirm" onClick={handleMintingDemo} />
        )}
      </NFTPreviewConfirmBox>
    </NFTPreviewWrapper>
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
