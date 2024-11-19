import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import IcTonLogo from "@/assets/icons/Main/mainbutton_ton_logo.svg";
import IcWalletStake from "@/assets/icons/Landing/ic_wallet_stake.svg";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { boolean } from "zod";

const MainButton = ({ style }: { style?: React.CSSProperties }) => {
  const { connected, tonConnectUI } = useTonConnect();
  const navigate = useNavigate();

  const handleSwitchWalletFunction = () => {
    if (connected) {
      navigate("/stake/amount");
    } else {
      tonConnectUI.connectWallet();
    }
  };

  return (
    <>
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
        <TonWalletWrapper
          onClick={handleSwitchWalletFunction}
          style={style}
          id="main button connect wallet"
          $connected={connected}
        >
          <TonConnectCenterBox id="main button connect wallet">
            <img src={IcTonLogo} alt="connect" id="main button connect wallet" /> Connect wallet
          </TonConnectCenterBox>
        </TonWalletWrapper>
      )}
    </>
  );
};

export default MainButton;

const TonWalletWrapper = styled.div<{ $connected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 6rem;
  margin-bottom: 3.7rem;
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
  
  img {
    height: 24px;
    width: 24px;
  }
`;
