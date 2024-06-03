import { useEffect, useState } from "react";
import styled from "styled-components";
import { mutate } from "swr";

import Header from "@/components/common/Header";
import MainMyAssetInfo from "@/components/main/MainMyAssetInfo";
import { WelcomeModal } from "@/components/main/Modal/WelcomeModal";
import StakeView from "@/components/main/StakeView/StakeView";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";

const tele = (window as any).Telegram.WebApp;

const Main = () => {
  const { address, balance, refreshTonData } = useTonConnect();
  const { nftList, isLoading, isError } = useStakeInfo(address);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [modal, setModal] = useState(false);

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
  }, [refreshTonData, address]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.hide();
    }

    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setModal(true); // Only show modal if user hasn't visited before
    }
  }, []);

  // Calculate the total amount staked
  const totalStaked = nftList?.reduce((acc, nft) => acc + nft.amount, 0) || 0;

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
          refreshTonData={refreshTonData}
          totalStaked={totalStaked}
          isLoading={isLoading || isRefreshing}
          isError={isError}
        />
        <MainBorder />
        <StakeView />
      </MainWrapper>
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
