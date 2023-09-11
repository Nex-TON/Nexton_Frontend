import { useEffect, useRef } from "react";
import ModalWrapper from "../../../modals/ModalWrapper";
import useTonConnect from "../../../../hooks/useTonConnect";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  ModalHeader,
  OpenTonViewer,
  OpenTonViewerBox,
  SubTitle,
  Title,
} from "../../../modals/BasicModal";
import IcClose from "../../../../assets/icons/ic_close.svg";
import IcModalArrow from "../../../../assets/icons/Modal/ic_modal_arrow.svg";

interface WithDrawModalProps {
  handleToggleModal: () => void;
}

const WithDrawModal = (props: WithDrawModalProps) => {
  const { handleToggleModal } = props;

  const { address } = useTonConnect();
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
        <ModalHeader
          style={{ marginBottom: "2.4rem" }}
          onClick={handleToggleModal}
        >
          <img src={IcClose} alt="close" />
        </ModalHeader>
        <Title style={{ textAlign: "center" }}>Succeed!</Title>
        <SubTitle>
          Unstaked amount is claimed,
          <br /> and will be deposited into your wallet.
          <br />
          It could take a few minutes. Check it.
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
        <Button onClick={() => navigate("/myasset/nftlist")}>Okay</Button>
      </Container>
    </ModalWrapper>
  );
};

export default WithDrawModal;
