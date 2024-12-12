import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IcClose from "@/assets/icons/Modal/ic_close.svg";
import { MODAL_TEXT } from "@/constants/ModalText";
import useTonConnect from "@/hooks/contract/useTonConnect";

import { Button, Container, Title } from "./Modal.styled";
import ModalWrapper from "./ModalWrapper";
import { style } from "@mui/system";

interface NftDetailModalProps {
  type: string;
  toggleModal: () => void;
  onClose?: () => void;
  isDark?: boolean;
  navigateOnClose?: string;
}

// todo: refactor this to reduce the code duplication
function NftDetailModal(props: NftDetailModalProps) {
  const { type, toggleModal, onClose, isDark, navigateOnClose } = props;

  const navigate = useNavigate();

  const handleModalText = (type: string, isDark?: boolean) => {
    switch (type) {
      case "blockborrow":
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
              <SubTitle $isDark={isDark}>
                <span>Bonus rewards</span> are coming your way.
              </SubTitle>
              <SubTitle $isDark={isDark}>
                Updates on nxTON and <span>extra points</span>
              </SubTitle>
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
          {type == "blockborrow100" && (
            <img
              src={IcClose}
              alt="close"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                toggleModal();
              }}
            />
          )}
        </ModalHeader>

        {handleModalText(type, isDark)}
        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }

            if (navigateOnClose) {
              toggleModal();
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

export default NftDetailModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 4.5rem;
`;

const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
  margin-bottom: 4.3rem;
`;
export const SubTitle = styled.p<{ $isDark?: boolean }>`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  color: ${({ $isDark }) => $isDark && "#C6C5D0"};
  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    font-weight: 700;
  }
`;
