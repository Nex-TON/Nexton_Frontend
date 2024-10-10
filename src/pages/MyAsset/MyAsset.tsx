import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import useTonConnect from "@/hooks/contract/useTonConnect";

import Header from "../../components/common/Header";
import NftHeader from "../../components/myAsset/NftHeader";

const tele = (window as any).Telegram.WebApp;

const MyAsset = () => {
  const { connected, tonConnectUI } = useTonConnect();
  const { pathname } = useLocation();
  const [myAssetMenu, setMyAssetMenu] = useState("NFT");
  const navigate = useNavigate();

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(`/`);
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  return (
    <MyAssetWrapper $type={pathname.includes("nftlist") ? true : false}>
      <Header
        isOpen={false}
        backgroundType={pathname.includes("nftlist") ? false : true}
        text="My Asset"
        connected={connected}
        tonConnectUI={tonConnectUI}
      />
      <MyAssetContentWrapper>
        <NftHeader myAssetMenu={myAssetMenu} />
      </MyAssetContentWrapper>
      <Outlet />
    </MyAssetWrapper>
  );
};

export default MyAsset;

const MyAssetWrapper = styled.div<{ $type: boolean }>`
  width: 100%;
  min-height: 100%;
  height: auto;

  background-color: ${({ $type }) => ($type ? `#FFF` : ` #f2f2f7`)};
`;

const MyAssetContentWrapper = styled.div`
  width: 100%;
`;
