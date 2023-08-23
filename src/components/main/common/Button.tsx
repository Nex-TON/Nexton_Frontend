import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import IcMenuLeverage from "../../../assets/icons/Landing/ic_menuLeverage.svg";
import IcMenuNxt from "../../../assets/icons/Landing/ic_menuNxt.svg";
import IcMenuLoan from "../../../assets/icons/Landing/ic_menuLoan.svg";
import IcMenuCoin from "../../../assets/icons/Landing/ic_menuCoin.svg";
import IcMenuSwap from "../../../assets/icons/Landing/ic_menuSwap.svg";
import IcMenuAsset from "../../../assets/icons/Landing/ic_menuMyAsset.svg";

interface ButtonProps {
  top?: string;
  bottom?: string;
  title?: string;
  page: string;
  type: string;
}
const Button = (props: ButtonProps) => {
  const navigate = useNavigate();
  const { top, bottom, title, page, type } = props;

  const moveToPage = () => {
    switch (page) {
      case "Stake":
        navigate("/leverage");
        break;
      case "Nlp":
        navigate("/nlp");
        break;
      case "Myasset":
        navigate("/myasset");
        break;
      default:
        break;
    }
  };

  const SelectImage = (type: string) => {
    switch (type) {
      case "leverage":
        return <StyledImage src={IcMenuLeverage} alt="Leverage" marginTop />;
        break;
      case "NXT":
        return <StyledImage src={IcMenuNxt} alt="NXT" />;
        break;
      case "Loan":
        return <StyledImage src={IcMenuLoan} alt="Loan" />;
        break;
      case "NLP":
        return <StyledImage src={IcMenuCoin} alt="Coin" />;
        break;
      case "Swap":
        return <StyledImage src={IcMenuSwap} alt="Swap" />;
        break;
      case "Asset":
        return <StyledImage src={IcMenuAsset} alt="Asset" />;
        break;
    }
  };

  return (
    <StyledButton onClick={moveToPage}>
      {SelectImage(type)}
      <StyleTextBox>
        {type === "leverage" || type === "NXT" ? (
          <>
            <StyleText>{top}</StyleText>
            <StyleText>{bottom}</StyleText>
          </>
        ) : (
          <StyleText>{title}</StyleText>
        )}
      </StyleTextBox>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 10.8rem;
  height: 10.8rem;
  padding: 0 0 1.1rem 1.1rem;

  border: none;
  border-radius: 1rem;
  background-color: #f2f2f7;
  ${({ theme }) => theme.fonts.Telegram_Medium_1};
  color: #ffffff;

  box-shadow: 0 0 2rem 0 rgba(198, 197, 208, 0.3);

  cursor: pointer;
`;

const StyledImage = styled.img<{ marginTop?: boolean }>`
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;

  ${({ marginTop }) =>
    marginTop &&
    css`
      top: 0;
      right: 0;
    `}
`;

const StyleTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  position: absolute;
  bottom: 1.1rem;
  left: 1.1rem;
`;
const StyleText = styled.span`
  color: #767680;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;
