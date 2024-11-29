import { styled } from "styled-components";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcWarningRed from "@/assets/icons/Stake/ic_warning_red.svg";
import { Button, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ComingSoonModalProps {
  toggleModal: () => void;
  onConfirm: () => void;
}

export const ComingSoonModal = (props: ComingSoonModalProps) => {
  const { onConfirm, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $isDark>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              toggleModal();
            }}
          />
        </ModalHeader>

        <Title $isDark>Coming Soon!</Title>
        <SubTitleBox $marginBottom>
          <SubTitle $isDark>$nxTON Loan is almost here.</SubTitle>
          <SubTitle $isDark>Stay tuned!</SubTitle>
        </SubTitleBox>
        <Button onClick={onConfirm}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};

export const Container = styled.div<{ $isDark?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 32rem;
  height: max-content;

  background-color: ${({ $isDark }) => ($isDark ? "#1A1B23" : "#fff")};
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 1.6rem 1rem 1rem 1rem;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 0%.5;
`;