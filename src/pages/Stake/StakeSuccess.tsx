import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { Slide, toast, ToastContainer } from "react-toastify";

import FooterButton from "@/components/common/FooterButton";
import ReferralButtonBox from "@/components/referral/ReferralButtonBox";
import NftPreviewImage from "@/components/stake/NFTPreview/NftPreviewImage";
import NFTPreviewInfo from "@/components/stake/NFTPreview/NFTPreviewInfo";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { isDevMode } from "@/utils/isDevMode";
import IcAlertBlue from "@/assets/icons/Stake/ic_alert_blue.svg";

const tele = (window as any).Telegram.WebApp;

const StakeSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isStakeSuccess, lockPeriod, stakingInfo } = location.state || {};

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.enableClosingConfirmation();
      tele.onEvent("backButtonClicked", () => {
        navigate("/");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  // Show toast message when the user has successfully staked
  useEffect(() => {
    toast(`Transaction approved! Your balance will be updated within the next 30 seconds.`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  }, []);

  return (
    <>
      <StakeSuccessWrapper>
        <StakeSuccessHeader>
          <p>Successfully Staked!</p>
        </StakeSuccessHeader>
        <ReferralButtonContainer>
          <ReferralButtonBox />
        </ReferralButtonContainer>
        <NftPreviewImage lockup={lockPeriod} />
        <NFTPreviewInfo stakingInfo={stakingInfo} />
        <NFTPreviewConfirmBox>
          <img src={IcAlertBlue} alt="alertBlue" />
          <div>
            <NFTPreviewConfirmText>You cannot cancel the transaction after pressing</NFTPreviewConfirmText>
            <NFTPreviewConfirmText>Confirm. Please check the NFT information.</NFTPreviewConfirmText>
          </div>

          {!isDevMode ? (
            <MainButton text="Back to main" onClick={() => navigate("/")} />
          ) : (
            /* Used for testing */
            <FooterButton title="Back to main" onClick={() => navigate("/")} />
          )}
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            style={{ fontSize: "7rem" }}
          />
        </NFTPreviewConfirmBox>
      </StakeSuccessWrapper>
    </>
  );
};
export default StakeSuccess;

const NFTPreviewConfirmText = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;

const NFTPreviewConfirmBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.4rem;

  width: 100%;
  margin-bottom: 1.6rem;
`;

const ReferralButtonContainer = styled.div`
  padding: 0 2rem;
  margin: 20px 0;

  width: 100%;
  height: auto;
`;

const StakeSuccessHeader = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 6px;
  p {
    color: #333;
    ${({ theme }) => theme.fonts.Nexton_Title_Large};
    text-align: center;
  }
`;

const StakeSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;
