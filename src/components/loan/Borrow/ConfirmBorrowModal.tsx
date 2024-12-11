import { styled } from "styled-components";

import { Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmBorrowModalProps {
  toggleModal: () => void;
  onConfirm: () => void;
}

export const ConfirmBorrowModal = (props: ConfirmBorrowModalProps) => {
  const { onConfirm, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark>
        <Title $isDark $textCenter>
          Would you like to borrow $nxTON?
        </Title>
        <SubTitleBox $marginBottom>
          <SubTitle $isDark>Please verify the loan</SubTitle>
          <SubTitle $isDark>information accurately.</SubTitle>
        </SubTitleBox>

        <ModalButtonWrapper>
          <ModalButton type="no" onClick={toggleModal}>
            Not Now
          </ModalButton>
          <ModalButton type="yes" onClick={onConfirm}>
            Yes
          </ModalButton>
        </ModalButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

const ModalButton = styled.button<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.2rem 0;

  border: none;
  border-radius: 1.4rem;

  background-color: ${({ type }) => (type === "no" ? "#FFF" : "#007AFF")};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  color: ${({ type }) => (type === "no" ? "#007AFF" : "#FFF")};
  ${({ theme }) => theme.fonts.Telegram_Medium_2};

  cursor: pointer;
`;
