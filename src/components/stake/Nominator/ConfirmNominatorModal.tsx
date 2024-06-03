import IcClose from "@/assets/icons/Modal/ic_close.svg";
import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/Modal.styled";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";

interface ConfirmNominatorModalProps {
  toggleModal: () => void;
  onConfirm: () => void;
  name: string;
  description: string;
}

export const ConfirmNominatorModal = (props: ConfirmNominatorModalProps) => {
  const { onConfirm, toggleModal, name, description } = props;

  return (
    <ModalWrapper>
      <Container $isDark $disablePaddingTop>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              toggleModal();
            }}
          />
        </ModalHeader>

        <Title $isDark style={{ width: "75%", textAlign: "center" }}>
          You have selected the {name}!
        </Title>

        <SubTitleBox $marginBottom>
          <SubTitle $isDark>By selecting this card,</SubTitle>
          <SubTitle $isDark style={{ width: "75%", textAlign: "center" }}>
            {description}
          </SubTitle>
        </SubTitleBox>

        <Button onClick={onConfirm}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};
