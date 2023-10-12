import styled from "styled-components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NftHeader from "../../components/myAsset/NftHeader";

const MyAsset = () => {
  const [myAssetMenu, setMyAssetMenu] = useState("NFT");

  return (
    <MyAssetWrapper>
      <MyAssetHeaderBox>
        <MyAssetHeaderTop>MY asset</MyAssetHeaderTop>
      </MyAssetHeaderBox>
      <MyAssetContentWrapper>
        <NftHeader myAssetMenu={myAssetMenu} />
      </MyAssetContentWrapper>
      <Outlet />
    </MyAssetWrapper>
  );
};

export default MyAsset;

const MyAssetWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;

  background-color: #f2f2f7;
`;

const MyAssetHeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const MyAssetHeaderTop = styled.span`
  padding-top: 1rem;

  color: #45464f;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
`;

const MyAssetContentWrapper = styled.div`
  width: 100%;
`;
