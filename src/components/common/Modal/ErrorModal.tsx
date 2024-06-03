import { useRecoilState } from "recoil";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";
import { globalError } from "@/lib/atom/globalError";

import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "./Modal.styled";

export const ErrorModal = () => {
  const [error, setError] = useRecoilState<Error>(globalError);
  let defaultError = "Something went wrong...";

  if (error?.message.includes("UserRejectsError")) {
    defaultError = "User rejected the transaction.";
  }

  const handleClose = () => setError(null);

  return (
    <>
      {error && (
        <ModalWrapper>
          <Container $isDark $disablePaddingTop>
            <ModalHeader>
              <img src={IcClose} alt="close" onClick={handleClose} />
            </ModalHeader>

            <Title $isDark>{defaultError}</Title>
            <SubTitleBox style={{ marginBottom: "3.7rem" }}>
              <SubTitle $isDark>Please, try again later.</SubTitle>
            </SubTitleBox>

            <Button onClick={handleClose}>Okay</Button>
          </Container>
        </ModalWrapper>
      )}
    </>
  );
};
