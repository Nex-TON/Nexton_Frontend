import styled from "styled-components";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NftHeader from "../../components/myAsset/NftHeader";
import Header from "../../components/common/Header";

const MyAsset = () => {
  const { pathname } = useLocation();
  const [myAssetMenu, setMyAssetMenu] = useState("NFT");

  return (
    <MyAssetWrapper $type={pathname.includes("nftlist") ? true : false}>
      <Header
        isOpen={false}
        backgroundType={pathname.includes("nftlist") ? false : true}
        text="My Asset"
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
