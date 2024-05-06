import { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Header from "@/components/common/Header";
import { WelcomeModal } from "@/components/common/Modal/BasicModal";
import MainMyAssetInfo from "@/components/main/MainMyAssetInfo";
import StakeView from "@/components/main/StakeView/StakeView";
import { useTrackReferral } from "@/hooks/api/referral/useTrackReferral";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { addressState } from "@/lib/atom/address";

const tele = (window as any).Telegram.WebApp;

const Main = () => {
  const { address, balance, getBalance } = useTonConnect();
  const { nftList, isLoading, isError } = useStakeInfo(address);

  const { trigger } = useTrackReferral();

  const [, setTonAddress] = useRecoilState(addressState);
  const [modal, setModal] = useState(false);

  // Track referral on app launch
  useEffect(() => {
    if (tele) {
      tele.ready();
      const isReferred = localStorage.getItem("referrerId");

      const referralId = tele.initDataUnsafe.start_param;
      const userId = tele.initDataUnsafe.user?.id;
      // If user has not been referred yet, track the referral
      if (referralId && userId && !isReferred) {
        trigger({ newUserId: userId, referralLink: referralId }).then(res => {
          const { data } = res;

          if (data.success) {
            toast(`🎊 You were successfully referred by User ${data.referrerId}!`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });

            localStorage.setItem("referrerId", res.data.referrerId);
          }
        });
      }
    }
  }, [trigger]);

  // Calculate the total amount staked
  const totalStaked = nftList?.reduce((acc, nft) => acc + nft.amount, 0) || 0;

  // Set the address in the atom
  useEffect(() => {
    if (address) {
      setTonAddress(address);
    }
  }, [address]);

  // Show welcome modal if user hasn't visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setModal(true); // Only show modal if user hasn't visited before
    }

    if (tele) {
      tele.ready();
      tele.BackButton.hide();
    }
  }, []);

  const toggleModal = () => {
    setModal(prev => !prev);
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <>
      {modal && <WelcomeModal toggleModal={toggleModal} />}

      <MainWrapper>
        <Header isOpen={false} text="NEXTON" backgroundType={false} />
        <MainMyAssetInfo
          address={address}
          balance={balance}
          getBalance={getBalance}
          totalStaked={totalStaked}
          isLoading={isLoading}
          isError={isError}
        />
        <MainBorder />
        <StakeView />
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
