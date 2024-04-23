import { useRecoilState } from "recoil";

import IcClose from "@/assets/icons/Modal/ic_close.svg";
import { Button, Container, ModalHeader, SubTitle, SubTitleBox, Title } from "@/components/common/Modal/BasicModal";
import ModalWrapper from "@/components/common/Modal/ModalWrapper";
import { globalError } from "@/lib/atom/globalError";

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
          <Container>
            <ModalHeader>
              <img src={IcClose} alt="close" onClick={handleClose} />
            </ModalHeader>

            <Title>{defaultError}</Title>
            <SubTitleBox style={{ marginBottom: "3.7rem" }}>
              <SubTitle>Please, try again later.</SubTitle>
            </SubTitleBox>

            <Button onClick={handleClose}>Okay</Button>
          </Container>
        </ModalWrapper>
      )}
    </>
  );
};
