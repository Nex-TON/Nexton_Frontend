import { styled } from "styled-components";
import ModalWrapper from "./ModalWrapper";
import IcClose from "../../../assets/icons/ic_close.svg";
import { useNavigate } from "react-router-dom";
import IcModalArrow from "../../../assets/icons/Modal/ic_modal_arrow.svg";
import useTonConnect from "../../../hooks/contract/useTonConnect";
import { MODAL_TEXT } from "../../../constants/ModalText";

interface BasicModalProps {
  type: string;
  toggleModal: () => void;
}

function BasicModal(props: BasicModalProps) {
  const { type, toggleModal } = props;

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
          <img src={IcClose} alt="close" onClick={toggleModal} />
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
        <Button onClick={() => navigate("/")}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
}

export default BasicModal;

const Container = styled.div`
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 3.7rem;
`;

const OpenTonViewerBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 1.7rem;
  margin-bottom: 3.7rem;
`;

const OpenTonViewer = styled.button`
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
`;

const Title = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
`;

const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

const SubTitle = styled.p`
  font-family: "pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 138.462% */
`;

const Button = styled.button`
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
