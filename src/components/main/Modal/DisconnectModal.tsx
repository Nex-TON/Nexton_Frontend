import { styled } from "styled-components";

import IcWalletDisconnect from "@/assets/icons/Modal/ic_wallet_disconnect_white.svg";
import { Container } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface DisconnectModalProps {
  handleModalState: () => void;
}

const DisconnectModal = (props: DisconnectModalProps) => {
  const { handleModalState } = props;

  const clearStorage = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <ModalWrapper>
      <Container $isDark>
        <DisconnectBox>
          <img src={IcWalletDisconnect} alt="disconnect" />
        </DisconnectBox>
        <ModalTitle>Connection off</ModalTitle>
        <ModalDesc>
          <p>Your wallet will be detached</p>
          <p>from NEXTON.</p>
        </ModalDesc>

        <ModalButtonWrapper>
          <ModalButton type="yes" onClick={clearStorage}>
            Yes
          </ModalButton>
          <ModalButton type="no" onClick={handleModalState}>
            Not Now
          </ModalButton>
        </ModalButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

export default DisconnectModal;

const ModalTitle = styled.div`
  margin-bottom: 1.2rem;

  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
`;

const ModalDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  p {
    color: #c6c5d0;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
  margin-top: 3.4rem;
`;

const ModalButton = styled.button<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.2rem 0;

  border: none;
  border-radius: 1.5rem;

  background-color: ${({ type }) => (type === "yes" ? "#FFF" : "#007AFF")};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  color: ${({ type }) => (type === "yes" ? "#007AFF" : "#FFF")};
  ${({ theme }) => theme.fonts.Telegram_Medium_2};

  cursor: pointer;
`;

const DisconnectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 44px;
  height: 44px;
  padding: 1.2rem;
  margin-bottom: 2.4rem;

  border: none;
  border-radius: 1.5rem;
  background-color: #2f3038;

  filter: drop-shadow(0px 0px 14px rgba(0, 0, 0, 0.4));
`;
