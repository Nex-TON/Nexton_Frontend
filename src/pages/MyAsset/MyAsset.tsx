import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "@/components/common/Header";
import NftHeader from "@/components/myAsset/NftHeader";
import useTonConnect from "@/hooks/contract/useTonConnect";

const MyAsset = () => {
  const { connected, tonConnectUI } = useTonConnect();
  const { pathname } = useLocation();

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
        <NftHeader />
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
