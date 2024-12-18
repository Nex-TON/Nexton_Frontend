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
import useTonConnect from "@/hooks/contract/useTonConnect";
import FloatCommunityIc from "@/assets/icons/Main/floating_community.svg";
import FloatSupportIc from "@/assets/icons/Main/floating_support.svg";
import FloatCloseIc from "@/assets/icons/Main/floating_close.svg";
import FloatCsIc from "@/assets/icons/Main/floating_cs.svg";
import { OfficialAnouncementModal } from "@/components/main/Modal/OfficialAnnouncementModal";

import "react-toastify/dist/ReactToastify.css";
import NextonNews from "@/components/main/NextonNews";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import {useTomo} from "@tomo-inc/tomo-telegram-sdk";
import { TonProvider } from '@tomo-inc/tomo-telegram-sdk/dist';
import { TonClient } from '@ton/ton';
import { beginCell, toNano, Address } from '@ton/core';
import { BASE_URL_DEV } from '@tomo-inc/tomo-telegram-sdk/example/baseUrlDev';
import { useThemeParams } from '@vkruglikov/react-telegram-web-app';

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
  const {borrowList}=useRepayNftList(address);

  const { trigger: triggerManageReferral } = useManageReferral();
  const { trigger } = useTrackReferral();

  const [modal, setModal] = useState(false);
  const [officialModal, setOfficialModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userId = tele?.initDataUnsafe?.user?.id;

  const [addr, setAddr] = useState('');
  const [toAddr1, setToAddr1] = useState('');
  const [toValue1, setToValue1] = useState('0.1');
  const [sendRes, setSendRes] = useState('');
  const [tonProof, setTonProof] = useState('');

  const [contractAddr, setContractAddr] = useState(
    'EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT'
    // 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
  );
  const [toAddr2, setToAddr2] = useState('');
  const [toValue2, setToValue2] = useState('0.1');
  const [sendRes2, setSendRes2] = useState('');
  const [tomo_ton, setTomo_ton] = useState<TonProvider>();
  const [userTokenAddress, setUserTokenAddress] = useState('');

  const [tomoBalance, setTomoBalance] = useState('');
  const [balanceAddr, setBalanceAddr] = useState('');

  const { openConnectModal, providers, connectResult } = useTomo();

  useEffect(() => {
    const tomo_ton = providers.tomo_ton;
    tomo_ton && setTomo_ton(tomo_ton);
    if (tomo_ton?.connected && tomo_ton?.account) {
      walletAddressReq(tomo_ton);
    } else {
      setAddr('');
      setBalanceAddr('');
    }
  }, [
    providers.tomo_ton,
    providers.tomo_ton?.connected,
    providers.tomo_ton?.account,
  ]);
  useEffect(() => {
    if (addr && contractAddr) {
      initUserTokenAddress();
    }
    async function initUserTokenAddress() {
      const tokenAddr = await getUserTokenWalletAddress(addr, contractAddr);
      setUserTokenAddress(tokenAddr?.toString());
    }
  }, [addr, contractAddr]);

  const walletAddressReq = async tomo_ton => {
    const address = tomo_ton?.account?.address;
    setAddr(address);
    setBalanceAddr(address);
  };

  const connectWallet = async () => {
    if (addr) {
      tomo_ton?.disconnect && tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    openConnectModal();
  };

  const connectWalletWithTonProof = async () => {
    if (addr) {
      await tomo_ton?.disconnect();
      setAddr('');
      setBalanceAddr('');
      return;
    }
    // the tonProof mast be a hex string
    openConnectModal({
      tonProof: Buffer.from('1234', 'utf8').toString('hex'),
    });
  };

  // UQCp3k_JcqLVbC0vMdiXCuDqPUWOlSXwrtI3aAZ1F3Ze9V8t
  const sendTonTransaction = async () => {
    if (!canSend) return;
    const txParams = {
      messages: [
        {
          address: toAddr1,
          amount: toNano(toValue1).toString(),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      from: addr,
    };
    const res = await (tomo_ton as TonProvider).sendTransaction(txParams);
    setSendRes(JSON.stringify(res));
  };
  const sendTonTx = async () => {
    if (!canSend) return;
    const txParams = {
      messages: [
        {
          address: toAddr1,
          amount: toNano(toValue1).toString(),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      from: addr,
    };
    const res = await (tomo_ton as any).sendTransaction(txParams);
    setSendRes(JSON.stringify(res));
  };

  const canSend = useMemo(() => toAddr1 && toValue1 && addr, [
    toAddr1,
    toValue1,
    addr,
  ]);

  async function getUserTokenWalletAddress(userAddress, jettonMasterAddress) {
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    });
    const userAddressCell = beginCell()
      .storeAddress(Address.parse(userAddress))
      .endCell();
    const response = await client.runMethod(
      Address.parse(jettonMasterAddress),
      'get_wallet_address',
      [{ type: 'slice', cell: userAddressCell as any }]
    );
    return response.stack.readAddress();
  }

  const createJettonPayload = () => {
    const destinationAddress = Address.parse(toAddr2);

    const body = beginCell()
      .storeUint(0xf8a7ea5, 32) // jetton 转账操作码
      .storeUint(0, 64) // query_id:uint64
      .storeCoins(toNano(toValue2)) // amount:(VarUInteger 16) -  转账的 Jetton 金额（小数位 = 6 - jUSDT, 9 - 默认）
      .storeAddress(destinationAddress) // destination:MsgAddress
      .storeAddress(destinationAddress) // response_destination:MsgAddress
      .storeMaybeRef(null)
      .storeCoins(toNano('0.000001'))
      .storeMaybeRef(null)
      .endCell();

    return body.toBoc().toString('base64');
  };

  const sendTonDataTx = async () => {
    const payload = createJettonPayload();
    const txParams = {
      messages: [
        {
          address: userTokenAddress,
          amount: 0.1 * 10 ** 9,
          payload,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    };
    const res = await tomo_ton?.sendTransaction(txParams as any);
    setSendRes2(JSON.stringify(res));
  };

  const sendTonDataTxForTomo = async () => {
    const txParams = {
      messages: [
        {
          address: toAddr2, // [legacy] this will be the recipient address
          amount: toValue2, // [legacy] this would be the amount of jetton to transfer
          payload: JSON.stringify({
            contractAddr,
            precision: 9,
            forwardAmount: toNano('0.0001').toString(),
            memo: '',
          }),
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    };
    const res = await tomo_ton?.sendTransaction(txParams);
    setSendRes2(JSON.stringify(res));
  };

  const getBalance = async () => {
    if (!balanceAddr) return;
    const res = await tomo_ton?.getBalance(balanceAddr);
    setTomoBalance(res.formatted);
  };

  

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

  //사용자가 들어오자 마자 nxTON이 상장되었다는 소식 팝업으로 알림
  useEffect(() => {
    const hasSeenOfficialNotice = localStorage.getItem("hasSeenOfficialNotice");
    if (!hasSeenOfficialNotice) {
      setOfficialModal(true);
    }
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
    const nftTotal = nftList?.reduce((acc, nft) => {
      if (nft.tokenSort === "TON") {
        return acc + nft.principal;
      }
      return acc;
    }, 0) || 0;
  
    const borrowTotal = borrowList?.reduce((acc, borrow) => {
      if (borrow.tokenSort === "TON") {
        return acc + borrow.principal;
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

  return (
    <>
      {modal && <WelcomeModal toggleModal={toggleModal} />}
      {officialModal && <OfficialAnouncementModal toggleModal={toggleOfficialModal} />}
      <MainWrapper>
        <Header isOpen={false} text="NEXTON" backgroundType={false} connected={connected} tonConnectUI={tonConnectUI} />
        <MainMyAssetInfo
          tonConnectUI={tonConnectUI}
          openConnectModal={connectWallet}
          connected={connected}
          tomo_conneted={tomo_ton?.connected}
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
