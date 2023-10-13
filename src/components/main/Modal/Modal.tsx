import { styled } from "styled-components";
import ModalWrapper from "../../common/Modal/ModalWrapper";
import { useRecoilState } from "recoil";
import { addressState } from "../../../lib/atom/address";

interface ModalProps {
  handleModalState: () => void;
}

const Modal = (props: ModalProps) => {
  const { handleModalState } = props;
  const [, setTonAddrsss] = useRecoilState(addressState);

  const clearStorage = () => {
    window.localStorage.clear();
    window.location.reload();
    setTonAddrsss("");
  };

  return (
    <ModalWrapper>
      <ModalWhiteBox>
        <ModalTitle>Connection off</ModalTitle>
        <ModalDesc>
          <p>Your wallet will be detached</p>
          <p>from NEXTON.</p>
        </ModalDesc>
        <ModalButtonWrapper>
          <ModalButton type="yes" onClick={clearStorage}>
            Yes
          </ModalButton>
          <ModalButton type="no" onClick={handleModalState}>
            Not Now
          </ModalButton>
        </ModalButtonWrapper>
      </ModalWhiteBox>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 32rem;
  padding: 4.2rem 1rem 1rem 1rem;

  border-radius: 2rem;
  background-color: #f9f9ff;
`;

const ModalTitle = styled.div`
  margin-bottom: 1.2rem;

  color: #007aff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
`;

const ModalDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;
  margin-top: 3.4rem;
`;

const ModalButton = styled.button<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.2rem 0;

  border: none;
  border-radius: 1.4rem;

  background-color: ${({ type }) => (type === "yes" ? "#FFF" : "#007AFF")};
  box-shadow: 0px 0px 20px 0px rgba(198, 197, 208, 0.3);
  color: ${({ type }) => (type === "yes" ? "#007AFF" : "#FFF")};
  ${({ theme }) => theme.fonts.Telegram_Medium_2};

  cursor: pointer;
`;
