import { useCallback, useEffect, useMemo, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { mutate } from "swr";
// import {Fab,Action} from "react-tiny-fab";
// import "react-tiny-fab/dist/styles.css";
import React from "react";
import { Fab, Zoom } from "@mui/material";
import { Popover } from "@mui/material";

import Header from "@/components/common/Header";
import ActionCards from "@/components/main/ActionCards";
import MainMyAssetInfo from "@/components/main/MainMyAssetInfo";
import { WelcomeModal } from "@/components/main/Modal/WelcomeModal";
import MyTokens from "@/components/main/MyTokens";
import { useManageReferral } from "@/hooks/api/referral/useManageReferral";
import { useTrackReferral } from "@/hooks/api/referral/useTrackReferral";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";
import FloatingOpenIc from "@/assets/icons/Main/floating_open.svg";
import FloatingCloseIc from "@/assets/icons/Main/floating_close.svg";
import FloatCommunityIc from "@/assets/icons/Main/floating_community.svg";
import FloatSupportIc from "@/assets/icons/Main/floating_support.svg";
import SupportBallon from "@/assets/image/support_ballon.png";
import CommunityBallon from "@/assets/image/community_ballon.png";

import "react-toastify/dist/ReactToastify.css";
import { fontFamily, fontSize } from "@mui/system";

const tele = (window as any).Telegram.WebApp;

const Main: React.FC = () => {
  const [isFbOpen, setIsFbOpen] = useState(false);

  const handleFloatingButton = () => {
    setIsFbOpen(prev => !prev);
  };

  const closeFab = () => {
    setIsFbOpen(false);
  };

  const { address, balance, refreshTonData, connected, tonConnectUI } = useTonConnect();
  const { nftList, isLoading, isError } = useStakeInfo(address);

  const { trigger: triggerManageReferral } = useManageReferral();
  const { trigger } = useTrackReferral();

  const [modal, setModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh TON data
  useEffect(() => {
    async function handleRefreshData() {
      setIsRefreshing(true);

      try {
        await Promise.all([refreshTonData(), mutate(`/data/getAllStakeInfoByAddress?address=${address}`)]);
      } catch (error) {
        console.error("An error occurred during the refresh operation:", error);
      } finally {
        setIsRefreshing(false);
      }
    }

    handleRefreshData();

    const timer = setInterval(() => {
      handleRefreshData();
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, [refreshTonData, address]);

  // Show welcome modal if user hasn't visited before
  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.expand(); // Expand the app to full screen
      tele.BackButton.hide();
    }

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setModal(true); // Only show modal if user hasn't visited before
    }
  }, []);

  // Track referral on app launch
  useEffect(() => {
    const trackReferral = async () => {
      if (tele) {
        tele.ready();
        const isReferred = localStorage.getItem("referrerId");

        const referralId = tele.initDataUnsafe?.start_param;
        const userId = tele.initDataUnsafe?.user?.id;
        const username = tele.initDataUnsafe?.user?.username;

        try {
          // Send referral data to the server if the user hasn't visited Referral page
          if (userId) {
            await triggerManageReferral({ userId, username });
          }

          // If user has not been referred yet, track the referral
          if (referralId && userId && !isReferred) {
            const res = await trigger({ newUserId: userId, referralLink: referralId, username });
            const { data } = res;

            if (data.success) {
              toast(
                data.username
                  ? `🎊 You were successfully referred by User @${data.username}!`
                  : "🎊 You were successfully referred!",
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Slide,
                },
              );

              localStorage.setItem("referrerId", data.referrerId);
            }
          }
        } catch (error) {
          console.error("Error tracking referral:", error);
        }
      }
    };

    trackReferral();
  }, [trigger, triggerManageReferral]);

  // Calculate the total amount staked
  const totalStaked = useMemo(() => {
    return nftList?.reduce((acc, nft) => acc + nft.principal, 0) || 0;
  }, [nftList]);

  // Toggle welcome modal
  const toggleModal = useCallback(() => {
    setModal(prev => !prev);
    localStorage.setItem("hasVisited", "true");
  }, []);

  return (
    <>
      {modal && <WelcomeModal toggleModal={toggleModal} />}
      <MainWrapper>
        <Header isOpen={false} text="NEXTON" backgroundType={false} connected={connected} tonConnectUI={tonConnectUI} />
        <MainMyAssetInfo
          tonConnectUI={tonConnectUI}
          connected={connected}
          address={address}
          balance={balance}
          refreshTonData={refreshTonData}
          totalStaked={totalStaked}
          isLoading={isLoading || isRefreshing}
          isError={isError}
        />
        <MainBorder />
        <ActionCards />
        {/* @deprecated */}
        {/* <StakeView /> */}

        <MyTokens />
        <Overlay visible={isFbOpen} onClick={closeFab} />
        <Fab
          style={{
            position: "absolute",
            backgroundColor: "#1F53FF",
            width: "48px",
            height: "48px",
            padding: "12px",
            bottom: "42px",
            right: "10px",
          }}
          onClick={handleFloatingButton}
        >
          <img
            src={isFbOpen ? FloatingCloseIc : FloatingOpenIc}
            alt="Floating button"
            style={{ width: "24px", height: "24px" }}
          />
          {isFbOpen && (
            <>
              <Zoom in={isFbOpen}>
                  <Fab
                    style={{
                      backgroundColor: "#F8F8F8",
                      padding: "8px",
                      height: "40px",
                      width: "40px",
                      position: "absolute",
                      bottom: "116px",
                    }}
                    onClick={() => {
                      window.open("https://t.me/m/-Y3bstHbMzE9");
                    }}
                  >
                    <img src={FloatSupportIc} alt="community link" />
                  </Fab>
              </Zoom>
              <Zoom in={isFbOpen}>
                <Fab
                  style={{
                    backgroundColor: "#F8F8F8",
                    padding: "8px",
                    height: "40px",
                    width: "40px",
                    position: "absolute",
                    bottom: "66px",
                  }}
                  onClick={() => {
                    window.open("https://t.me/+YBNeM9m_yhtlNzM9");
                  }}
                >
                  <img src={FloatCommunityIc} alt="community link" />
                </Fab>
              </Zoom>
            </>
          )}
        </Fab>
      </MainWrapper>

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
    </>
  );
};

export default Main;

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background: var(--Neutral-Neutural-0, #000);
  display: ${({ visible }) => (visible ? "block" : "none")};
  z-index: 999; /* 오버레이가 Fab보다 위에 오도록 */
`;

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  background-color: #fff;
`;

export const MainBorder = styled.div`
  width: 100%;
  height: 1rem;

  background-color: #f1f4f4;
`;
