import { css, styled } from "styled-components";
import IcBack from "../../assets/icons/ic_back.svg";

interface BackButtonProps {
  type?: string;
  margin?: boolean;
  unstaking?: boolean;
  handleMovePreview?: () => void;
  handleMoveUnstaking?: () => void;
}

const BackButton = (props: BackButtonProps) => {
  const { type, margin, unstaking, handleMovePreview, handleMoveUnstaking } =
    props;

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
    <BackButtonWrapper onClick={handleBack} type={type}>
      <BackImage src={IcBack} alt="back" type={type} />
    </BackButtonWrapper>
  );
};

export default BackButton;

const BackButtonWrapper = styled.div<{ type: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ type }) =>
    type === "detail"
      ? css`
          position: relative;
          width: 2.6rem;
          height: 2.6rem;
        `
      : css`
          position: absolute;
          top: 2.6rem;
          left: 1rem;
          width: 3.4rem;
          height: 3.4rem;
        `}

  border-radius: 50%;
  background-color: #f9f9ff;
  box-shadow: 0px 0px 20px 0px #e1e4e6;

  cursor: pointer;
`;

const BackImage = styled.img<{ type: string }>`
  width: ${({ type }) => (type === "detail" ? "0.8rem" : "1rem")};
`;
