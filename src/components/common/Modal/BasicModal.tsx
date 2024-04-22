import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import IcModalArrow from "@/assets/icons/Modal/ic_modal_arrow.svg";
import IcNotification from "@/assets/icons/Modal/ic_notification.svg";
import { MODAL_TEXT } from "@/constants/ModalText";
import useTonConnect from "@/hooks/contract/useTonConnect";

import ModalWrapper from "./ModalWrapper";

interface BasicModalProps {
  type: string;
  toggleModal: () => void;
  onClose?: () => void;
}

interface WelcomeModalProps {
  toggleModal: () => void;
  onClose?: () => void;
}

export const LoaderModal = () => {
  return (
    <ModalWrapper>
      <Container style={{ minHeight: "256px" }}>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#007aff"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </Container>
    </ModalWrapper>
  );
};

export const WelcomeModal = (props: WelcomeModalProps) => {
  const { onClose, toggleModal } = props;

  return (
    <ModalWrapper>
      <Container style={{ backgroundColor: "#1A1B23" }}>
        <WelcomeModalContent>
          <img style={{ marginBottom: "1.2rem" }} src={IcNotification} alt="notification" />
          <Title style={{ color: "#FFFFFF" }}>This service is in alpha version.</Title>
          <SubTitleBox>
            <SubTitle style={{ color: "#C6C5D0" }}>
              The functionality of this service may be updated in the future.
            </SubTitle>
          </SubTitleBox>
        </WelcomeModalContent>

        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }
            toggleModal();
          }}
        >
          Start!
        </Button>
      </Container>
    </ModalWrapper>
  );
};

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
      <Container>
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%);

  width: 32rem;
  height: max-content;

  background-color: #fff;
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 1.6rem 1.6rem 1rem 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 3.7rem;
`;

export const OpenTonViewerBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 1.7rem;
  margin-bottom: 3.7rem;
`;

export const OpenTonViewer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  padding: 0;
  padding-bottom: 0.4rem;

  border: none;
  border-bottom: 0.1rem solid #007aff;
  background: transparent;
  color: #008aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};

  cursor: pointer;
`;

export const Title = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
`;

export const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

export const SubTitle = styled.p`
  font-family: "pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 138.462% */
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: #fff;

  box-sizing: border-box;
  border-radius: 1.4rem;
  padding: 1.2rem 8.2rem;
  background: #007aff;

  ${({ theme }) => theme.fonts.Telegram_Medium_2};

  border: none;
  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);

  cursor: pointer;
`;

const WelcomeModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 1.8rem 0;
  padding: 0 1.2rem;
  text-align: center;
`;
