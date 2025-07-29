import { styled } from "styled-components";

import IcNotification from "@/assets/icons/Modal/ic_notification.svg";
import { Button, Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface WelcomeModalProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const WelcomeModal = (props: WelcomeModalProps) => {
  const { onClose, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark>
        <WelcomeModalContent>
          <img style={{ marginBottom: "1.2rem" }} src={IcNotification} alt="notification" />
          <Title $isDark>This service is in beta version.</Title>
          <SubTitleBox>
            <SubTitle $isDark>The functionality of this service may be updated in the future.</SubTitle>
          </SubTitleBox>
        </WelcomeModalContent>

        <WelcomeButtonWrapper>
          <Button
            onClick={() => {
              if (onClose) {
                onClose();
              }
              toggleModal();
            }}
          >
            Start!
          </Button>
        </WelcomeButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

const WelcomeModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 1.4rem;
  text-align: center;
`;

const WelcomeButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 3.4rem;
`;
