import { useNavigate } from "react-router-dom";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcModalArrow from "@/assets/icons/Modal/ic_modal_arrow.svg";
import { MODAL_TEXT } from "@/constants/ModalText";
import useTonConnect from "@/hooks/contract/useTonConnect";

import {
  Button,
  Container,
  ModalHeader,
  OpenTonViewer,
  OpenTonViewerBox,
  SubTitle,
  SubTitleBox,
  Title,
} from "./Modal.styled";
import ModalWrapper from "./ModalWrapper";

interface BasicModalProps {
  type: string;
  toggleModal: () => void;
  onClose?: () => void;
}

function BasicModal(props: BasicModalProps) {
  const { type, toggleModal, onClose } = props;

  const navigate = useNavigate();
  const { address } = useTonConnect();

  const handleModalText = (type: string) => {
    switch (type) {
      case "stake":
        return (
          <>
            <Title>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "loan":
        return (
          <>
            <Title>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "unstaking":
        return (
          <>
            <Title>{MODAL_TEXT[type].title}</Title>
            <Title>{MODAL_TEXT[type].titleBr}</Title>
            <SubTitleBox>
              <SubTitle>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "claim":
        return (
          <>
            <Title>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      default:
        break;
    }
  };

  return (
    <ModalWrapper>
      <Container $disablePaddingTop>
        <ModalHeader>
          <img
            src={IcClose}
            alt="close"
            onClick={() => {
              if (onClose) {
                onClose();
              }
              navigate("/");
            }}
          />
        </ModalHeader>

        {handleModalText(type)}

        <OpenTonViewerBox>
          <OpenTonViewer
            onClick={() => {
              window.location.href = `https://testnet.tonviewer.com/${address}`;
            }}
          >
            Open ton viewer
            <img src={IcModalArrow} alt="modalArrow" />
          </OpenTonViewer>
        </OpenTonViewerBox>

        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }
            navigate("/");
          }}
        >
          Okay
        </Button>
      </Container>
    </ModalWrapper>
  );
}

export default BasicModal;
