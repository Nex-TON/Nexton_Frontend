import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import IcTonLogo from "@/assets/icons/Main/mainbutton_ton_logo.svg";
import IcWalletStake from "@/assets/icons/Landing/ic_wallet_stake.svg";
import useTonConnect from "@/hooks/contract/useTonConnect";

const MainButton = ({
  style,
  toggled,
  handleToggle,
}: {
  style?: React.CSSProperties;
  toggled: boolean;
  connected: boolean;
  handleToggle: () => void;
}) => {
  const { connected } = useTonConnect();

  const navigate = useNavigate();

  const handleSwitchWalletFunction = () => {
    if (connected) {
      navigate("/stake/amount");
    }
  };

  return (
    <>
      {toggled && <Overlay onClick={handleToggle} />}
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
          <TonWalletWrapper onClick={handleToggle} style={style} id="main button connect wallet" $connected={connected}>
            <TonConnectCenterBox id="main button connect wallet">
              <img src={IcTonLogo} alt="connect" id="main button connect wallet" /> Connect wallet{" "}
              {/* <img src={toggled ? IcArrowUp : IcArrowDown} alt="" /> */}
            </TonConnectCenterBox>
          </TonWalletWrapper>
          {/* {toggled && (
            <CollectWalletToggleWrapper>
              <WalletCollection
                onClick={() => {
                  setActiveWalletType("TonConnect");
                  connect("TonConnect");
                  handleToggle();
                }}
              >
                <img src={IcTon} alt="main page ton icon" />
                Connect TON Wallet
              </WalletCollection>
              <DivideLine />
              <WalletCollection
                onClick={() => {
                  setActiveWalletType("Tomo");
                  connect("Tomo");
                  handleToggle();
                }}
              >
                <img src={IcTomo} alt="main page tomo icon" />
                Connect TOMO Wallet
              </WalletCollection>
            </CollectWalletToggleWrapper>
          )} */}
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
  justify-content: start;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  padding: 1.7rem 2.4rem 1.7rem 2.2rem;
  img {
    width: 24px;
    height: 24px;
  }
  gap: 1.5rem;
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
