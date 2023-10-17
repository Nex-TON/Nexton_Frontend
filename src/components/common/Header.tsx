import { styled } from "styled-components";
import IcWalletConnect from "../../assets/icons/Landing/ic_landing_wallet.svg";
import IcWalletDisconnect from "../../assets/icons/Landing/ic_landing_wallet_disconnect.svg";
import useTonConnect from "../../hooks/contract/useTonConnect";
import Modal from "../main/Modal/Modal";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  isOpen: boolean;
  text: string;
  backgroundType: boolean;
}

const Header = (props: HeaderProps) => {
  const { connected, tonConnectUI } = useTonConnect();
  const { isOpen, text, backgroundType } = props;
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
      {isOpenModal && <Modal handleModalState={handleModalState} />}
      <HeaderWrapper isOpen={isOpen} backgroundType={backgroundType}>
        <HeaderTitle onClick={() => navigate("/")}>{text}</HeaderTitle>
        <HeaderRightBox>
          {pathname === "/" && (
            <DisconnectButton connect={connected}>
              {connected ? (
                <img
                  src={IcWalletDisconnect}
                  alt="walletConnectDisconnect"
                  onClick={handleModalState}
                />
              ) : (
                <img
                  src={IcWalletConnect}
                  alt="walletConnect"
                  onClick={() => tonConnectUI.connectWallet()}
                />
              )}
            </DisconnectButton>
          )}
          <MenuButton onClick={handleRouter} isOpen={isOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuButton>
        </HeaderRightBox>
      </HeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header<{
  isOpen: boolean;
  backgroundType: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 1.5rem;

  background-color: ${({ backgroundType }) =>
    backgroundType ? "#f2f2f7" : "#fff"};
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DisconnectButton = styled.button<{ connect: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.4rem;
  height: 4.4rem;
  padding: 1.2rem;

  border: none;
  border-radius: 1.8rem;
  background: ${({ connect }) =>
    connect
      ? `#2F3038`
      : `linear-gradient(160deg, #f3f6fc 11.73%, #e6e7f7 98.61%)`};
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  position: relative;

  width: 4.4rem;
  height: 4.4rem;
  padding: 1.2rem;

  border: none;
  border-radius: 1.8rem;
  background: linear-gradient(160deg, #f3f6fc 11.73%, #e6e7f7 98.61%);

  span {
    background-color: #333;
    display: block;
    position: absolute;
    height: 0.2rem;
    width: 50%;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: ${({ isOpen }) => (isOpen ? "50%" : "35%")};
      left: 25%;
      transform: ${({ isOpen }) =>
        isOpen ? "translateY(-50%) rotate(45deg)" : "none"};
    }

    &:nth-child(2) {
      top: 50%;
      left: 25%;
      transform: translateY(-50%);
      opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      bottom: ${({ isOpen }) => (isOpen ? "50%" : "35%")};
      left: 25%;
      transform: ${({ isOpen }) =>
        isOpen ? "translateY(50%) rotate(-45deg)" : "none"};
    }
  }

  cursor: pointer;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #2c3542;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;
