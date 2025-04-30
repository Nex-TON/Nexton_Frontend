import { useNavigate } from "react-router-dom";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcModalArrow from "@/assets/icons/Modal/ic_modal_arrow.svg";
import { MODAL_TEXT } from "@/constants/ModalText";

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
import useTonConnect from "@/hooks/contract/useTonConnect";

interface BasicModalProps {
  type: string;
  toggleModal: () => void;
  onClose?: () => void;
  isDark?: boolean;
  navigateOnClose?: string;
}

// todo: refactor this to reduce the code duplication
function BasicModal(props: BasicModalProps) {
  const { type, toggleModal, onClose, isDark, navigateOnClose } = props;

  const navigate = useNavigate();
  const { address } = useTonConnect();

  const handleModalText = (type: string, isDark?: boolean) => {
    switch (type) {
      case "stake":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "loan":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "repay":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "unstaking":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <Title $isDark={isDark}>{MODAL_TEXT[type].titleBr}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "claim":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "blockborrow":
        return (
          <>
            <Title $isDark={isDark}><br/>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "blockunstake":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
            </SubTitleBox>
          </>
        );
      case "blockborrow100":
        return (
          <>
            <Title $isDark={isDark}>{MODAL_TEXT[type].title}</Title>
            <SubTitleBox>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].desc}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr2}</SubTitle>
              <SubTitle $isDark={isDark}>{MODAL_TEXT[type].descBr3}</SubTitle>
            </SubTitleBox>
          </>
        );
      default:
        break;
    }
  };

  return (
    <ModalWrapper>
      <Container $disablePaddingTop $isDark={isDark}>
        <ModalHeader>
          {type != "blockborrow" && type != "blockunstake" && (
            <img
              src={IcClose}
              alt="close"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                navigate("/main");
              }}
            />
          )}
        </ModalHeader>

        {handleModalText(type, isDark)}
        <OpenTonViewerBox>
          {type != "blockborrow" && type != "blockunstake" && type != "blockborrow100" && (
            <OpenTonViewer
              onClick={() => {
                window.location.href = `https://tonviewer.com/${address}`;
              }}
            >
              Open ton viewer
              <img src={IcModalArrow} alt="modalArrow" />
            </OpenTonViewer>
          )}
        </OpenTonViewerBox>
        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }

            if (navigateOnClose) {
              toggleModal();
              navigate(navigateOnClose);
            } else {
              navigate("/main");
            }
          }}
        >
          Okay
        </Button>
      </Container>
    </ModalWrapper>
  );
}

export default BasicModal;
