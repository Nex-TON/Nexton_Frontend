import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import IcMenuLeverage from "../../../assets/icons/Landing/ic_menuLeverage.svg";
import IcMenuNxt from "../../../assets/icons/Landing/ic_menuNxt.svg";
import IcMenuLoan from "../../../assets/icons/Landing/ic_menuLoan.svg";
import IcMenuCoin from "../../../assets/icons/Landing/ic_menuCoin.svg";
import IcMenuSwap from "../../../assets/icons/Landing/ic_menuSwap.svg";
import IcMenuAsset from "../../../assets/icons/Landing/ic_menuMyAsset.svg";
import IcMenuCoinDisable from "../../../assets/icons/Landing/ic_menuCoin_Disable.svg";
import IcMenuNxtDisable from "../../../assets/icons/Landing/ic_menuNxt_Disable.svg";
import GradientBox from "../../common/GradientBox";
import useTonConnect from "../../../hooks/useTonConnect";

interface ButtonProps {
  top?: string;
  bottom?: string;
  title?: string;
  page?: string;
  type: string;
  unused?: boolean;
}
const Button = (props: ButtonProps) => {
  const { connected } = useTonConnect();
  const navigate = useNavigate();
  const { top, bottom, title, page, type, unused } = props;

  const moveToPage = () => {
    switch (page) {
      case "Stake":
        navigate("/stake/amount");
        break;
      case "Nlp":
        navigate("/nlp");
        break;
      case "Myasset":
        navigate("/myasset/nftlist");
        break;
      case "Loan":
        navigate("/loan");
        break;
      case "Swap":
        navigate("/swap");
        break;
      default:
        break;
    }
  };

  const SelectImage = (type: string) => {
    switch (type) {
      case "leverage":
        return <StyledImage src={IcMenuLeverage} alt="Leverage" />;
      case "NXT":
        return <StyledImage src={IcMenuNxt} alt="NXT" />;
      case "Loan":
        return <StyledImage src={IcMenuLoan} alt="Loan" />;
      case "NLP":
        return <StyledImage src={IcMenuCoin} alt="Coin" />;
      case "Swap":
        return <StyledImage src={IcMenuSwap} alt="Swap" />;
      case "Asset":
        return <StyledImage src={IcMenuAsset} alt="Asset" />;
    }
  };

  return (
    <StyledButton onClick={moveToPage} disabled={!connected}>
      {SelectImage(type)}
      {unused && <GradientBox />}
      <StyleText $unused={unused}>{title}</StyleText>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  position: relative;

  width: 100%;

  border: none;
  background-color: transparent;

  aspect-ratio: 1 / 1;
  cursor: pointer;
`;

const StyledImage = styled.img<{ $margintop?: boolean }>`
  /* position: absolute;
  top: 1.1rem;
  right: 1.1rem;

  ${({ $margintop }) =>
    $margintop &&
    css`
      top: 0;
      right: 0;
    `} */
`;

const StyleText = styled.span<{ $unused: boolean }>`
  color: #333;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

const CommingSoonText = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 0.5rem;

  color: #0088cc;
  ${({ theme }) => theme.fonts.Nexton_Comming_Soon};

  text-align: center;
  z-index: 1;
`;
