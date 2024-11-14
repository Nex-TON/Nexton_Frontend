import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "@/components/common/Header";
import NftHeader from "@/components/myAsset/NftHeader";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { UserInfoCard } from "@/components/myAsset/UserInfoCard";
import MainButton from "@/components/main/MainButton";
import MainNavigationBar from "@/components/common/MainNavigationBar";
import { TotalBalance } from "@/components/myAsset/TotalBalance";

const tele = (window as any).Telegram.WebApp;

const MyAsset = () => {
  const { connected, tonConnectUI } = useTonConnect();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    <MyAssetWrapper $type={pathname.includes("nftlist") ? true : false}>
      <Header isOpen={false} backgroundType={false} text="My page" connected={connected} tonConnectUI={tonConnectUI} />
      <MyAssetContentWrapper>
        <UserInfoCard />
        <MainButton />
        <TotalBalance/>
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
