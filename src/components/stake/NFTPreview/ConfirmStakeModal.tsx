import { styled } from "styled-components";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcWarningRed from "@/assets/icons/Stake/ic_warning_red.svg";
import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/BasicModal";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmStakeModalProps {
  toggleModal: () => void;
  onConfirm: () => void;
}

export const ConfirmStakeModal = (props: ConfirmStakeModalProps) => {
  const { onConfirm, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              toggleModal();
            }}
          />
        </ModalHeader>

        <Title>Would you like to stake?</Title>
        <SubTitleBox style={{ marginBottom: "3.7rem" }}>
          <SubTitle>Please ensure you have entered</SubTitle>
          <SubTitle>the correct values.</SubTitle>

          <SubTitleWarning>
            <img src={IcWarningRed} alt="warning_icon" />
            <SubTitle>If you stake, withdrawal will not be possible.</SubTitle>
          </SubTitleWarning>
        </SubTitleBox>

        <Button onClick={onConfirm}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};

const SubTitleWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1.5rem;
  gap: 0.4rem;

  color: #ff7979;
`;
