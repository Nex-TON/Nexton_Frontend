import { useNavigate } from "react-router-dom";

import { numberCutter } from "@/utils/numberCutter";

import { Caption3} from "../Borrow/BorrowListItem.styled";

import {
  RepayListBottomTextBottomRight,
  RepayListBottomTextBottomLeft,
  RepayListBottom,
  RepayListBottomTextBottom,
  RepayListItemDivider,
  RepayListItemWrapper,
  RepayListTop,
  RepayListTopButton,
  RepayListTopLeft,
  RepayListTopLeftIcon,
  RepayListTopLeftText,
} from "./RepayListItem.styled";

const RepayListItem = () => {
  const navigate = useNavigate();

  return (
    <RepayListItemWrapper onClick={() => navigate("/loan/1/repay/details")}>
      <RepayListTop>
        <RepayListTopLeft>
          <RepayListTopLeftIcon>1</RepayListTopLeftIcon>
          <RepayListTopLeftText>
            <Caption3>Borrowed</Caption3>
            <p><span>000.00 </span>nxTON</p>
          </RepayListTopLeftText>
        </RepayListTopLeft>

        <RepayListTopButton onClick={() => navigate("/loan/1/repay/details")}>Repayment</RepayListTopButton>
      </RepayListTop>
      <RepayListBottom>
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Principal</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{numberCutter(123.42)} nxTON</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      </RepayListBottom>
      <RepayListItemDivider />
      <RepayListBottom>
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Interest rate</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>95%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      </RepayListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
