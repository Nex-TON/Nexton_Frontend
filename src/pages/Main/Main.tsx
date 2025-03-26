import { useCallback, useEffect, useMemo, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { styled } from "styled-components";
import { mutate } from "swr";
import React from "react";
import { Fab, Zoom, Tooltip } from "@mui/material";
import { postUserAddress } from "@/api/postUserAddress";

import Header from "@/components/common/Header";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import ActionCards from "@/components/main/ActionCards";
import MainMyAssetInfo from "@/components/main/MainMyAssetInfo";
import { WelcomeModal } from "@/components/main/Modal/WelcomeModal";
import { useManageReferral } from "@/hooks/api/referral/useManageReferral";
import { useTrackReferral } from "@/hooks/api/referral/useTrackReferral";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import FloatCommunityIc from "@/assets/icons/Main/floating_community.svg";
import FloatSupportIc from "@/assets/icons/Main/floating_support.svg";
import FloatCloseIc from "@/assets/icons/Main/floating_close.svg";
import FloatCsIc from "@/assets/icons/Main/floating_cs.svg";
import { OfficialAnouncementModal } from "@/components/main/Modal/OfficialAnnouncementModal";
import useTonConnect from "@/hooks/contract/useTonConnect";

import "react-toastify/dist/ReactToastify.css";
import NextonNews from "@/components/main/NextonNews";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";

import { AgreementModal } from "@/components/main/Modal/AgreementModal";
import { postAgreement } from "@/api/postAgreement";
import { useAgreement } from "@/hooks/api/main/useAgreement";
import { AnnouncementModal } from "@/components/main/Modal/AnnouncementModal";
// import { PopupModal } from "@/components/main/Modal/PopupModal";

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
  const { borrowList } = useRepayNftList(address);

  const { trigger: triggerManageReferral } = useManageReferral();
  const { trigger } = useTrackReferral();

  const [modal, setModal] = useState(false);
  const [officialModal, setOfficialModal] = useState(false);
  const [agreementModal, setAgreementModal] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const [announcementModal, setAnnouncementModal] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const userId = tele?.initDataUnsafe?.user?.id; //number

  const { data: userAgreement } = useAgreement(String(userId));

  // Refresh TON data
  useEffect(() => {
    async function handleRefreshData() {
      setIsRefreshing(true);

      try {
        if (!address) {
          mutate(`/data/getAllStakeInfoByAddress?address=${address}`);
        }
        if (connected) {
          await refreshTonData();
        }
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

  // 사용자가 들어오자 마자 nxTON이 상장되었다는 소식 팝업으로 알림
  useEffect(() => {
    const hasSeenOfficialNotice = localStorage.getItem("hasSeenOfficialNotice");
    if (!hasSeenOfficialNotice) {
      setOfficialModal(true);
    }
  }, []);

  useEffect(() => {
    setPopupModal(true);
  }, []);

  // 개인 정보 수집에 동의하지 않은 사용자에게 팝업으로 알림
  useEffect(() => {
    if(userAgreement){
    if (userAgreement?.agreement) {
      setAgreementModal(false);
    } else {
      setAgreementModal(true);
    }};
  }, [userAgreement]);

  useEffect(() => {
    setAnnouncementModal(true);
  }, []);

  //사용자 지갑 주소 전송
  useEffect(() => {
    const sendAddress = async () => {
      if (connected && address && userId) {
        try {
          const response = await postUserAddress({ telegramId: userId, address });
          if (response !== 200) {
            console.log("사용자 주소 전송 실패");
          }
        } catch (error) {
          console.error("주소 전송 중 오류 발생:", error);
        }
      }
    };

    sendAddress();
  }, [connected, address, userId]);

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
            await triggerManageReferral({ userId, address, username });
          }

          // If user has not been referred yet, track the referral
          if (referralId && userId && !isReferred) {
            const res = await trigger({
              newUserId: userId,
              newUserAddress: address,
              referralLink: referralId,
              username,
            });
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
    const nftTotal =
      (nftList||[])?.reduce((acc, nft) => {
        if (nft.tokenSort === "TON") {
          return acc + nft.principal;
        }
        return acc;
      }, 0) || 0;

    const borrowTotal =
      (borrowList||[])?.reduce((acc, borrow) => {
        if (borrow.tokenSort === "TON" && borrow.status === 0) {
          return acc + borrow.principal / borrow.loanToValue;
        }
        return acc;
      }, 0) || 0;

    return nftTotal + borrowTotal;
  }, [nftList, borrowList]);

  // Toggle welcome modal
  const toggleModal = useCallback(() => {
    setModal(prev => !prev);
    localStorage.setItem("hasVisited", "true");
  }, []);

  const toggleOfficialModal = useCallback(() => {
    setOfficialModal(prev => !prev);
    localStorage.setItem("hasSeenOfficialNotice", "true");
  }, []);

  // agreement modal
  const toggleAgreementModal = useCallback(() => {
    setAgreementModal(prev => !prev);
  }, []);

  const toggleAnnouncementModal = useCallback(() => {
    setAnnouncementModal(prev => !prev);
  }, []);

  const onAcceptAgreementModal = useCallback(async () => {
    // localStorage.setItem("agreePrivacyPolicy", "true");
    // localStorage.setItem("agreeTermsOfUse", "true");
    try {
      const response = await postAgreement({
        userId:userId.toString(),
      });
      console.log("이용약관 동의모달", response);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <>
      {modal && <WelcomeModal toggleModal={toggleModal} />}
      {officialModal && <OfficialAnouncementModal toggleModal={toggleOfficialModal} />}
      {announcementModal && <AnnouncementModal toggleModal={toggleAnnouncementModal} />}
      {agreementModal && <AgreementModal toggleModal={toggleAgreementModal} onAccept={onAcceptAgreementModal} />}
      <MainWrapper>
        <Header isOpen={false} text="NEXTON" backgroundType={false} connected={connected} />
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
        <NextonNews />
        <MainBorder />
        <ActionCards />
        {/* @deprecated */}
        {/* <StakeView /> */}
        <Overlay visible={isFbOpen} onClick={closeFab} id="main page close floating button" />
        <Fab
          style={{
            position: "absolute",
            backgroundColor: "#1F53FF",
            width: "48px",
            height: "48px",
            padding: "12px",
            bottom: "98px",
            right: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleFloatingButton}
          id="main page floating button"
        >
          <img
            src={isFbOpen ? FloatCloseIc : FloatCsIc}
            alt="Floating button"
            style={{ width: "24px", height: "24px", alignContent: "center", justifyContent: "center" }}
            id="main page floating button"
          />
          {isFbOpen && (
            <>
              <Zoom in={isFbOpen} style={{ position: "absolute" }}>
                <Tooltip
                  title="Support"
                  open={true}
                  placement="left"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "white",
                        fontSize: "12px",
                        color: "black",
                        padding: "7px 9px",
                        width: "73px",
                        height: "32px",
                        alignContent: "center",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        lineHeight: "150%",
                        fontStyle: "normal",
                      },
                    },
                    arrow: { sx: { color: "white" } },
                  }}
                  arrow
                >
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
                    id="mainpage floating button support"
                  >
                    <img src={FloatSupportIc} alt="community link" id="mainpage floating button support" />
                  </Fab>
                </Tooltip>
              </Zoom>
              <Zoom in={isFbOpen}>
                <Tooltip
                  title="Community"
                  open={true}
                  placement="left"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "white",
                        fontSize: "12px",
                        color: "black",
                        padding: "7px 12px",
                        width: "116px",
                        height: "32px",
                        alignContent: "center",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        lineHeight: "150%",
                        fontStyle: "normal",
                      },
                    },
                    arrow: { sx: { color: "white" } },
                  }}
                  arrow
                >
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
                    id="main page floating button community"
                  >
                    <img src={FloatCommunityIc} alt="community link" id="main page floating button community" />
                  </Fab>
                </Tooltip>
              </Zoom>
            </>
          )}
        </Fab>
        <MainNavigationBar />
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
      {/* <PopupModal/> */}
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
  z-index: 999;
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
