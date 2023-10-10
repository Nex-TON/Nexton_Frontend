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
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative; */

  width: 100%;
  height: 100%;
  /* height: 100%; */
  /* padding: 2.9rem 1.6rem 0 1.6rem; */

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
