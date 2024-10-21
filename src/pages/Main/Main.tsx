import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import { mutate } from "swr";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import React from "react";

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
import FloatCommunityIc from "@/assets/icons/Main/floating_community.svg";
import FloatSupportIc from "@/assets/icons/Main/floating_support.svg";

import "react-toastify/dist/ReactToastify.css";

const tele = (window as any).Telegram.WebApp;

const Main: React.FC = () => {
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
        <Fab
          mainButtonStyles={{ backgroundColor: "#1F53FF", width: "48px", height: "48px", padding: "12px" }}
          style={{ bottom: "42px", right: "10px" }}
          event="hover"
          alwaysShowTitle={true}
          icon={<img  src={FloatingOpenIc} style={{ width: "24px", height: "24px" }} />}
        >
          <Action text="Community" onClick={() => {window.open("https://t.me/+YBNeM9m_yhtlNzM9")}} style={{padding:"8px",height:"40px",width:"40px",backgroundColor:"#F8F8F8"}}>
            <img src={FloatCommunityIc} style={{height:"24px", width:"24px"}} />
          </Action>
          <Action  text="Support" onClick={() => {window.open("https://t.me/m/-Y3bstHbMzE9")}} style={{padding:"8px",height:"40px",width:"40px",backgroundColor:"#F8F8F8"}}>
          <img src={FloatSupportIc} style={{height:"24px", width:"24px"}}/>
          </Action>
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
