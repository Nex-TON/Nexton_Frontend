import styled from "styled-components";
import NftHeader from "../components/myAsset/NftHeader";
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  position: relative;

  padding: 2.9rem 1.6rem 0rem 1.6rem;
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
