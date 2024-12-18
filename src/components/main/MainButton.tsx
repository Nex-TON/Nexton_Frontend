import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import IcTonLogo from "@/assets/icons/Main/mainbutton_ton_logo.svg";
import IcWalletStake from "@/assets/icons/Landing/ic_wallet_stake.svg";
import useTonConnect from "@/hooks/contract/useTonConnect";
import IcArrowDown from "@/assets/icons/Main/arrow_down.svg";
import IcArrowUp from "@/assets/icons/Main/arrow_up.svg";
import IcTon from "@/assets/icons/Main/ton_icon.svg";
import IcTomo from "@/assets/icons/Main/tomo_icon.svg";

const MainButton = ({ style ,openConnectModal}: { style?: React.CSSProperties,openConnectModal?:any }) => {
  const { connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);

  const handleToggled = () => {
    setToggled(!toggled);
  };

  const handleSwitchWalletFunction = () => {
    if (connected) {
      navigate("/stake/amount");
    } else {
      tonConnectUI.connectWallet();
    }
  };


  return (
    <>
        {toggled && <Overlay onClick={handleToggled} />}
        {connected ? (
          <TonWalletWrapper
            onClick={handleSwitchWalletFunction}
            style={style}
            id="main button stake"
            $connected={connected}
          >
            <TonConnectCenterBox id="main button stake">
              <img src={IcWalletStake} alt="stake" id="main button stake" /> Let's stake TON
            </TonConnectCenterBox>
          </TonWalletWrapper>
        ) : (
          <WalletConnectWrapper>
            <TonWalletWrapper
              onClick={handleToggled}
              style={style}
              id="main button connect wallet"
              $connected={connected}
            >
              <TonConnectCenterBox id="main button connect wallet">
                <img src={IcTonLogo} alt="connect" id="main button connect wallet" /> Connect wallet{" "}
                <img src={toggled ? IcArrowUp : IcArrowDown} alt="" />
              </TonConnectCenterBox>
            </TonWalletWrapper>
            {toggled && (
              <CollectWalletToggleWrapper>
                <WalletCollection onClick={() => { handleSwitchWalletFunction(); handleToggled(); }}>
                  Connect TON Wallet
                  <img src={IcTon} alt="main page ton icon" />
                </WalletCollection>
                <DivideLine />
                <WalletCollection onClick={()=>{openConnectModal();handleToggled();}}>
                  Connect TOMO Wallet
                  <img src={IcTomo} alt="main page tomo icon" />
                </WalletCollection>
              </CollectWalletToggleWrapper>
            )}
          </WalletConnectWrapper>
        )}
    </>
  );
};

export default MainButton;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const DivideLine = styled.div`
  color: #f8f8f8;
  border: 1px solid;
`;

const WalletCollection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  padding: 1.7rem 2.4rem 1.7rem 2.2rem;
  img {
    width: 24px;
    height: 24px;
  }
`;

const WalletConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 30;
`;

const CollectWalletToggleWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  position: absolute;
  background-color: white;
  top: 8.5rem;
  border-radius: 1.5rem;
  flex-direction: column;
`;

const TonWalletWrapper = styled.div<{ $connected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 0.5rem 0;

  border-radius: 15px;
  background-color: ${({ $connected }) => ($connected ? "#1F53FF" : "#0098EA")};

  cursor: pointer;
`;

const TonConnectCenterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  color: #fff;
  font-family: Montserrat;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px;
  z-index: 30;


  img {
    height: 24px;
    width: 24px;
  }
`;
