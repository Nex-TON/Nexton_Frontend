import { useNavigate } from "react-router-dom";

import { numberCutter } from "@/utils/numberCutter";

import { Caption3 } from "../Borrow/BorrowListItem.styled";

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

const RepayListItem = ({nftId,principal,interestRate,ltv}) => {
  const navigate = useNavigate();

  return (
    <RepayListItemWrapper onClick={() => navigate("/loan/1/repay/details")}>
      <RepayListTop>
        <RepayListTopLeft>
          <RepayListTopLeftIcon>{nftId}</RepayListTopLeftIcon>
          <RepayListTopLeftText>
            <Caption3>Borrowed</Caption3>
            <p>
              <span>{principal} </span>nxTON
            </p>
          </RepayListTopLeftText>
        </RepayListTopLeft>

        <RepayListTopButton onClick={() => navigate("/loan/1/repay/details")}>Repayment</RepayListTopButton>
      </RepayListTop>
      <RepayListBottom>
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Principal</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{numberCutter(principal)} nxTON</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Interest rate</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{interestRate}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>LTV</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{ltv}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      </RepayListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
