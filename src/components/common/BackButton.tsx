import { styled } from "styled-components";
import IcBack from "../../assets/icons/ic_back.svg";

interface BackButtonProps {
  margin?: boolean;
  unstaking?: boolean;
  handleMovePreview?: () => void;
  handleMoveUnstaking?: () => void;
}

const BackButton = (props: BackButtonProps) => {
  const { margin, unstaking, handleMovePreview, handleMoveUnstaking } = props;

  const handleBack = () => {
    if (margin) {
      handleMovePreview();
    } else if (unstaking) {
      handleMoveUnstaking();
    } else {
      window.history.back();
    }
  };

  return (
    <BackButtonWrapper onClick={handleBack}>
      <img src={IcBack} alt="back" width={10} />
    </BackButtonWrapper>
  );
};

export default BackButton;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2.6rem;
  left: 1rem;

  width: 3.4rem;
  height: 3.4rem;

  border-radius: 50%;
  background-color: #f9f9ff;
  box-shadow: 0px 0px 20px 0px #e1e4e6;

  cursor: pointer;
`;
