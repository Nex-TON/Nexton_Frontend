import { styled } from "styled-components";
import { Container, Content, ContentBox, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";
import { useEffect } from "react";

interface PopupProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const PopupModal = (props: PopupProps) => {
  const { onClose, toggleModal } = props;

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <ModalWrapper>
      <Container $isDark>
        <WelcomeModalContent>
          <Title $isDark>We are currently updating!</Title>
          <SubTitleBox>
            <SubTitle $isDark>
              We are undergoing security
              <br />
              maintenance.
              <br />
              Sorry for any inconvenience.
            </SubTitle>
          </SubTitleBox>
          <ContentBox>
            <hr />
            <Content $isDark>
              Maintenance Period: <p>March 12 - March 20</p>
            </Content>
          </ContentBox>
        </WelcomeModalContent>

        <WelcomeButtonWrapper>
          <ButtonWrapper>
            <StonfiLinkButton
              onClick={() => {
                if (window.Telegram && window.Telegram.WebApp) {                
                  window.Telegram.WebApp.close();
                } else {
                  toggleModal();
                }
              }}
            >
              Got it
            </StonfiLinkButton>
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
