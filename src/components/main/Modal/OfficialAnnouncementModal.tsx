import { styled } from "styled-components";

import { Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface OfficialAnouncementProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const OfficialAnouncementModal = (props: OfficialAnouncementProps) => {
  const { onClose, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark>
        <WelcomeModalContent>
          <Title $isDark>🚀 Official Announcement!</Title>
          <SubTitleBox>
            <SubTitle $isDark>
              $nxTON is now officially listed on
              <br />
              STON.fi DEX!
              <br />
              Start trading now!
            </SubTitle>
          </SubTitleBox>
        </WelcomeModalContent>

        <WelcomeButtonWrapper>
          <ButtonWrapper>
            <StonfiLinkButton
              onClick={() => {window.open("https://app.ston.fi/pools/EQDp1Wo856blEgAxh8SGrkN4MVaK1p-h6Ih4ydMT2n3sJucq");toggleModal();}}
            >
              Go to STON.fi DEX
            </StonfiLinkButton>
            <CloseButton
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                toggleModal();
              }}
            >
              Close
            </CloseButton>
          </ButtonWrapper>
        </WelcomeButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StonfiLinkButton = styled.div`
  border-radius: 15px;
  background: #007aff;
  display: flex;

  width: 300px;
  height: 42px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  color: #fff;
  text-align: center;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};
`;

const CloseButton = styled.div`
  display: flex;
  width: 300px;
  padding: 12px 139px;
  justify-content: center;
  align-items: center;

  border-radius: 15px;
  background: rgba(0, 122, 255, 0.2);

  color: #fff;
  text-align: center;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};
`;

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
