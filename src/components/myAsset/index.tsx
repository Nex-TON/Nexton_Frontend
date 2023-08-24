import styled from "styled-components";
import NftHeader from "./NftHeader";
import NftList from "./NFT/NftList";
import { useState } from "react";
import UnstakingList from "./Unstaking/UnstakingList";

const MyAssetContent = () => {
  const [myAssetMenu, setMyAssetMenu] = useState("NFT");

  const handleChangeMyAssetMenu = (type: string) => {
    setMyAssetMenu(type);
  };

  return (
    <MyAssetContentWrapper>
      <NftHeader
        myAssetMenu={myAssetMenu}
        handleChangeMyAssetMenu={handleChangeMyAssetMenu}
      />
      {myAssetMenu === "NFT" && <NftList />}
      {myAssetMenu === "Unstaking" && <UnstakingList />}
    </MyAssetContentWrapper>
  );
};

export default MyAssetContent;

const MyAssetContentWrapper = styled.div`
  width: 100%;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem 13.9rem;

  border: none;
  border-radius: 1.2rem;
  background-color: #007aff;
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);

  ${({ theme }) => theme.fonts.Telegram_SemiBold};
  color: #ffffff;

  cursor: pointer;
`;
