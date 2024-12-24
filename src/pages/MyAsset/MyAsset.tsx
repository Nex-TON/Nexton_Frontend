import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "@/components/common/Header";
import NftHeader from "@/components/myAsset/NftHeader";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { UserInfoCard } from "@/components/myAsset/UserInfoCard";
import MainButton from "@/components/main/MainButton";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import { TotalBalance } from "@/components/myAsset/TotalBalance";
import { useWallet } from "@/context/WalletConnectionProvider";

const tele = (window as any).Telegram.WebApp;

const MyAsset = () => {
  const { getActiveWallet } = useWallet();
  const activeWallet = getActiveWallet();
  const address = activeWallet?.address || null;
  const connected = activeWallet?.connected || false;
  const balance = activeWallet?.balance || 0;
  const refreshTonData = activeWallet?.refreshTonData;

  const { pathname } = useLocation();
  const [toggled, setToggled] = useState<boolean>(false);
  const navigate = useNavigate();

  //main page my NFTs 버튼 누르면 my activity로 가게
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      console.log("Element found:", element);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);
  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(`/main`);
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <MyAssetWrapper $type={pathname.includes("myasset") ? true : false}>
      <Header isOpen={false} backgroundType={false} text="My page" connected={connected} />
      <MyAssetContentWrapper>
        <UserInfoCard />
        <MainButton
          toggled={toggled}
          handleToggle={() => setToggled(!toggled)}
          style={{ margin: "1.5rem 0 6.1rem 0" }}
        />
        <TotalBalance />
        <NftHeader />
      </MyAssetContentWrapper>
      <Outlet />
      <MainNavigationBar />
    </MyAssetWrapper>
  );
};

export default MyAsset;

const MyAssetWrapper = styled.div<{ $type: boolean }>`
  width: 100%;
  min-height: 100%;
  height: auto;
  max-width: 76.8rem;

  background-color: white;
`;

const MyAssetContentWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
