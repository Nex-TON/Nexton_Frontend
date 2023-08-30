import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import ModalWrapper from "./ModalWrapper";
import IcClose from "../../../assets/icons/ic_close.svg";

interface BasicModalProps {
  toggleModal: () => void;
}

const BasicModal = (props: BasicModalProps) => {
  const { toggleModal } = props;

  const innerRef = useRef(null);

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
        <Title>Successfully borrowed NXT</Title>
        <SubTitle>
          Please check deposited NXT
          <br />
          in your wallet, and transaction
          <br />
          history by tapping below button
        </SubTitle>

        <Button
          onClick={() => {
            window.location.href =
              "https://testnet.tonscan.org/address/EQCQih3SDKBwHVdCs5gCXJBIxD42agoC0gOJU1SBhqI8ThIc";
          }}
        >
          Open TON Viewer
        </Button>
      </Container>
    </ModalWrapper>
  );
};

export default BasicModal;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  margin-bottom: 4.1rem;
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

export const Title = styled.p`
  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}

  margin-bottom: 1.2rem;
`;

export const SubTitle = styled.p`
  margin-bottom: 6.1rem;

  font-family: "pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 138.462% */

  text-align: center;
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
