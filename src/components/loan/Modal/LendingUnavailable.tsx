import { styled } from "styled-components";

import { Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface LendingUnavailableProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const LendingUnavailableModal = (props: LendingUnavailableProps) => {
  const { onClose, toggleModal } = props;
  const imageUrl = "https://nextonserver.s3.eu-north-1.amazonaws.com/red-alert-circle.png"

  return (
    <ModalWrapper>
      <Container $isDark>
        <LendingUnavailableModalContent>
        <AlertCircle src={imageUrl} alt="My Image" />
          <Title $isDark>Lending Unavailable</Title>
          <SubTitleBox>
            <SubTitle $isDark>
              nxTON lending is currently unavailable.
              <br /> 
              We'll provide an official update soon.
              <br />
              We appologize for the inconvenience.
            </SubTitle>
          </SubTitleBox>
        </LendingUnavailableModalContent>

        <LendingUnavailableButtonWrapper>
          <ButtonWrapper>
            <OkayButton
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                toggleModal();
              }}>
                Okay
            </OkayButton>
          </ButtonWrapper>
        </LendingUnavailableButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OkayButton = styled.div`
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

const LendingUnavailableModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 1.4rem;
  text-align: center;
`;

const LendingUnavailableButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 3.4rem;
`;

const AlertCircle = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;