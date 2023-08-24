import { useEffect, useRef } from "react";
import IcClose from "../../../assets/icons/ic_close.svg";
import {
  Button,
  Container,
  ModalHeader,
  SubTitle,
  Title,
} from "../../modals/BasicModal";
import ModalWrapper from "../../modals/ModalWrapper";

const UnstakingModal = ({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) => {
  const innerRef = useRef(null);

  useEffect(() => {
    const handler = (e: Event) => {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
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
        <ModalHeader style={{ marginBottom: "3rem" }}>
          <img src={IcClose} alt="close" onClick={handleToggleModal} />
        </ModalHeader>
        <Title style={{ textAlign: "center" }}>
          Successfully <br />
          Unstaking Requested
        </Title>
        <SubTitle style={{ marginBottom: "4.9rem" }}>
          Unstaking process would take about
          <br /> 36 hours. Check left time on My asset, <br />
          and transaction data on TON viewer
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

export default UnstakingModal;
