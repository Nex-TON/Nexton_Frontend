import { styled } from "styled-components";

import { Container, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface AnnouncementProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const AnnouncementModal = (props: AnnouncementProps) => {
  const { onClose, toggleModal } = props;
  const imageUrl = "https://nextonserver.s3.eu-north-1.amazonaws.com/alert-circle.png"

  return (
    <ModalWrapper>
      <Container $isDark>
        <AnnouncementModalContent>
        <AlertCircle src={imageUrl} alt="My Image" />
          <Title $isDark>Announcement!</Title>
          <SubTitleBox>
            <SubTitle $isDark>
              At the moment, trading with <Emphasis>nxTON</Emphasis> is
              <br /> 
              not available. We will provide further
              <br />
              updates soon.
              <br />
              We apologize for the inconvenience.
            </SubTitle>
          </SubTitleBox>
        </AnnouncementModalContent>

        <AnnouncementButtonWrapper>
          <ButtonWrapper>
            <GotItButton
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                toggleModal();
              }}>
                Got it
            </GotItButton>
          </ButtonWrapper>
        </AnnouncementButtonWrapper>
      </Container>
    </ModalWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Emphasis = styled.span`
  font-weight: bold;
  color: #ffffff !important;
  text-decoration: none !important;
`;

const GotItButton = styled.div`
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

const AnnouncementModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 1.4rem;
  text-align: center;
`;

const AnnouncementButtonWrapper = styled.div`
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