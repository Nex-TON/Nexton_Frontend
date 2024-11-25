import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcWalletDisconnect from "@/assets/icons/Landing/ic_landing_wallet_disconnect.svg";
import IcMenuButton from "@/assets/icons/Menu/ic_menu_button.svg";

import DisconnectModal from "../main/Modal/DisconnectModal";

interface HeaderProps {
  isOpen: boolean;
  text: string;
  backgroundType: boolean;
  connected: boolean;
  tonConnectUI: any;
}

const Header = (props: HeaderProps) => {
  const { isOpen, text, backgroundType, connected, tonConnectUI } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleModalState = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleRouter = () => {
    if (isOpen) {
      navigate(-1);
    } else {
      navigate("/menu");
    }
  };

  return (
    <>
      {isOpenModal && <DisconnectModal handleModalState={handleModalState} />}
      <HeaderWrapper $isOpen={isOpen} $backgroundType={backgroundType}>
        <HeaderTitle id="header title" title={text}>
          {text}
        </HeaderTitle>
        <HeaderRightBox>
          {pathname === "/main" && (
            <DisconnectButton $connect={connected}>
              {connected ? <img src={IcWalletDisconnect} onClick={handleModalState} id="header disconnect wallet"/> : <></>}
            </DisconnectButton>
          )}
          <MenuButton onClick={handleRouter} $isOpen={isOpen} id="header menu button">
            <img src={IcMenuButton} id="header menu button"/>
          </MenuButton>
        </HeaderRightBox>
      </HeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header<{
  $isOpen: boolean;
  $backgroundType: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 1.5rem;

  background-color: ${({ $backgroundType }) => ($backgroundType ? "#f2f2f7" : "#fff")};
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const DisconnectButton = styled.button<{ $connect: boolean }>`
  display: ${({ $connect }) => ($connect ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  padding: 3px;

  border: none;
  border-radius: 10px;
  background-color: #f1f4f4;

  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  position: relative;

  width: 30px;
  height: 30px;
  padding: 3px;

  border: none;
  border-radius: 10px;
  background-color: #f1f4f4;

  img {
    width: 24px;
    height: 24px;
  }

  cursor: pointer;
`;

const HeaderTitle = styled.div<{ title: string }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ title }) => (title === "NEXTON" ? "#0c0f5e" : "var(--Neutral-Neutural-30, #46494a)")};
  font-family: Montserrat;
  font-size: ${({ title }) => (title === "NEXTON" ? "23px" : "22px")};
  font-style: normal;
  font-weight: ${({ title }) => (title === "NEXTON" ? 800 : 600)};
  line-height: ${({ title }) => (title === "NEXTON" ? "normal" : "34px")};
  letter-spacing: ${({ title }) => (title === "NEXTON" ? "normal" : "-0.44px")};

  cursor: pointer;
`;
