import { styled } from "styled-components";
import { useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import IcClose from "../../assets/icons/ic_close.svg";
import { useNavigate } from "react-router-dom";
import IcModalArrow from "../../assets/icons/Modal/ic_modal_arrow.svg";
import useTonConnect from "../../hooks/useTonConnect";

function BasicModal({ toggleModal }) {
  const navigate = useNavigate();
  const innerRef = useRef(null);
  const { address } = useTonConnect();

  useEffect(() => {
    const handler = (e: Event) => {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <ModalWrapper>
      <Container ref={innerRef}>
        <ModalHeader>
          <img src={IcClose} alt="close" onClick={toggleModal} />
        </ModalHeader>
        <Title>Successfully staked</Title>
        <SubTitle>
          For now you can check minted NFT
          <br />
          on My asset, and transaction data
        </SubTitle>
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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 4.7rem;
`;

export const Container = styled.div`
  position: fixed;

  top: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 32rem;
  height: max-content;

  background-color: #fff;
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 1.6rem 1.6rem 1rem 1rem;

  overflow: hidden;
`;

export const OpenTonViewerBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 1.7rem;
  margin-bottom: 4.9rem;
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
`;

export const Title = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}

  margin-bottom: 1.2rem;
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
