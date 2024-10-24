import IcClose from "@/assets/icons/Modal/ic_close.svg";
import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmUnstakingModalProps {
  toggleModal: () => void;
  onConfirm: () => void;
}

export const ConfirmUnstakingModal = (props: ConfirmUnstakingModalProps) => {
  const { onConfirm, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container $disablePaddingTop>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              toggleModal();
            }}
          />
        </ModalHeader>

        <Title $textCenter>Would you like to unstake?</Title>
        <SubTitleBox $marginBottom>
          <SubTitle>Unstaking process would take about 36 hours.</SubTitle>
          <SubTitle>Check left time on My asset,</SubTitle>
          <SubTitle>and transaction data on TON viewer.</SubTitle>
        </SubTitleBox>

        <Button onClick={onConfirm}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};