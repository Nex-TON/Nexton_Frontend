import styled from "styled-components";
import MainText from "./common/MainText";
import useTonConnect from "./../../hooks/useTonConnect";

const TonWallet = () => {
  const { address, connected, tonConnectUI } = useTonConnect();

  return (
    <TonWalletWrapper>
      <MainText title="Ton Wallet" />
      {connected ? (
        <TonWalletBox>{address.slice(0, 24)}...</TonWalletBox>
      ) : (
        <ConnectBtn
          onClick={() => {
            tonConnectUI.connectWallet();
          }}
        >
          Connect Wallet
        </ConnectBtn>
      )}
    </TonWalletWrapper>
  );
};

export default TonWallet;

const ConnectBtn = styled.button`
  width: 100%;
  padding: 1.6rem 2.4rem;

  border-radius: 3rem;
  background: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
  color: #fff;
  border: none;

  text-align: center;
`;

const TonWalletWrapper = styled.div`
  width: 100%;
  margin: 3.56rem 0 2.7rem 0;
`;

const TonWalletBox = styled.div`
  width: 100%;
  padding: 1.6rem 2.4rem;

  border-radius: 3rem;
  background: #f2f2f7;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
  color: #0c0f5e;

  text-align: center;
`;
