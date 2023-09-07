import { useEffect, useRef } from "react";
import IcClose from "../../../assets/icons/ic_close.svg";
import {
  Button,
  Container,
  ModalHeader,
  OpenTonViewer,
  OpenTonViewerBox,
  SubTitle,
  Title,
} from "../../modals/BasicModal";
import ModalWrapper from "../../modals/ModalWrapper";
import IcModalArrow from "../../../assets/icons/Modal/ic_modal_arrow.svg";
import { useNavigate } from "react-router-dom";

const UnstakingModal = ({
  handleToggleModal,
}: {
  handleToggleModal: () => void;
}) => {
  const navigate = useNavigate();
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
        <ModalHeader style={{ marginBottom: "2.4rem" }}>
          <img src={IcClose} alt="close" onClick={handleToggleModal} />
        </ModalHeader>
        <Title style={{ textAlign: "center" }}>
          Successfully <br />
          Unstaking Requested
        </Title>
        <SubTitle>
          Unstaking process would take about
          <br /> 36 hours. Check left time on My asset, <br />
          and transaction data on TON viewer
        </SubTitle>
        <OpenTonViewerBox>
          <OpenTonViewer
            onClick={() => {
              window.location.href =
                "https://testnet.tonscan.org/address/EQCQih3SDKBwHVdCs5gCXJBIxD42agoC0gOJU1SBhqI8ThIc";
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
};

export default UnstakingModal;
