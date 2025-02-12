import { styled } from "styled-components";

import { Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface AgreementProps {
  toggleModal: () => void;
  onClose?: () => void;
  onAccept?: () => void;
}

export const AgreementModal = (props: AgreementProps) => {
  const { onClose, toggleModal, onAccept } = props;

  return (
    <ModalWrapper>
      <Container $isDark>
        <WelcomeModalContent>
          <Title $isDark>Terms of Use Agreement</Title>
          <SubTitleBox>
            <SubTitle $isDark>
              Please review and accept
              <br />
              the{" "}
              <span onClick={() => window.open("https://blockwavelabs.notion.site/nexton-terms-of-use", "_blank")}>
                Terms of Use
              </span>{" "}
              and{" "}
              <span onClick={() => window.open("https://blockwavelabs.notion.site/nexton-privacy-policy", "_blank")}>
                Privacy Policy
              </span>
              <br />
              to continue.
            </SubTitle>
          </SubTitleBox>
        </WelcomeModalContent>

        <WelcomeButtonWrapper>
          <ButtonWrapper>
            <AcceptButton
              onClick={() => {
                toggleModal();
                if (onAccept) {
                  onAccept();
                }
              }}
            >
              accept
            </AcceptButton>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

const AcceptButton = styled.div`
  border-radius: 15px;
  background: #007aff;
  display: flex;
  height: 42px;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  ${({ theme }) => theme.fonts.Telegram_Medium_2};
`;

const CloseButton = styled.div`
  display: flex;
  padding: 12px 0;
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
