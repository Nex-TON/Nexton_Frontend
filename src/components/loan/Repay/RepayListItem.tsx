import { useNavigate } from "react-router-dom";

import { numberCutter } from "@/utils/numberCutter";

import { Caption3, LabelMedium } from "../Borrow/BorrowListItem.styled";

import {
  RepayListBottom,
  RepayListBottomTextBottom,
  RepayListDueDate,
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
            <Caption3>Borrowed nxTON</Caption3>
            <p>000.00 nxTON</p>
          </RepayListTopLeftText>
        </RepayListTopLeft>

        <RepayListTopButton onClick={() => navigate("/loan/1/repay/details")}>Repayment</RepayListTopButton>
      </RepayListTop>
      <RepayListDueDate>
        <span>Before the due date</span>
        <p>2 days</p>
      </RepayListDueDate>
      <RepayListItemDivider />
      <RepayListBottom>
        <RepayListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>{numberCutter(123.42)} TON</LabelMedium>
        </RepayListBottomTextBottom>
        <RepayListBottomTextBottom>
          <Caption3>Maturity date</Caption3>
          <LabelMedium>mm.dd.yy</LabelMedium>
        </RepayListBottomTextBottom>
        <RepayListBottomTextBottom>
          <Caption3>Interest rate</Caption3>
          <LabelMedium>95%</LabelMedium>
        </RepayListBottomTextBottom>
      </RepayListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
