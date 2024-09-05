import { TailSpin } from "react-loader-spinner";
import { styled } from "styled-components";

import { Container, SubTitle, Title } from "./Modal.styled";
import ModalWrapper from "./ModalWrapper";

const TransactionConfirmModal = ({ isDark = true }: { isDark?: boolean }) => {
  return (
    <ModalWrapper>
      <Container $isDark={isDark} style={{ minHeight: "234px" }}>
        <TailSpin
          visible={true}
          height="49"
          width="49"
          color={isDark ? "#fff" : "#454347"}
          ariaLabel="tail-spin-loading"
          radius="2"
          wrapperStyle={{}}
          wrapperClass=""
        />

        <TransactionConfirmModalContent>
          <Title $isDark={isDark}>Redirecting to wallet for transaction confirmation.</Title>
          <SubTitle $isDark={isDark}>It will only take a moment.</SubTitle>
        </TransactionConfirmModalContent>
      </Container>
    </ModalWrapper>
  );
};

export default TransactionConfirmModal;

const TransactionConfirmModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1.2rem;

  width: 100%;
  padding: 1.4rem 0 3.8rem 0;
  text-align: center;
`;
