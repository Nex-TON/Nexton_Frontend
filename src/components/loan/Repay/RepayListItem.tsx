import { useNavigate } from "react-router-dom";
import { numberCutter } from "@/utils/numberCutter";
import { Caption3 } from "../Borrow/BorrowListItem.styled";
import { limitDecimals } from "@/utils/limitDecimals";

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

const RepayListItem = ({loanId,nftId,principal,interestRate,ltv}) => {
  const navigate = useNavigate();

  return (
    <RepayListItemWrapper onClick={() => {navigate(`/loan/${nftId}/repay/details`,{state:{loanId}})}} id="repay page repayment box">
      <RepayListTop id="repay page repayment box">
        <RepayListTopLeft id="repay page repayment box">
          <RepayListTopLeftIcon id="repay page repayment box">{loanId}</RepayListTopLeftIcon>
          <RepayListTopLeftText id="repay page repayment box">
            <Caption3 id="repay page repayment box">Borrowed</Caption3>
            <p id="repay page repayment box">
              <span id="repay page repayment box">{limitDecimals(principal,3)} </span>NxTON
            </p>
          </RepayListTopLeftText>
        </RepayListTopLeft>

        <RepayListTopButton onClick={() => navigate(`/loan/${nftId}/repay/details`)} id="repay page repayment box">Repayment</RepayListTopButton>
      </RepayListTop>
      <RepayListBottom id="repay page repayment box">
        <RepayListBottomTextBottom id="repay page repayment box">
          <RepayListBottomTextBottomLeft id="repay page repayment box">Principal</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight id="repay page repayment box">{numberCutter(principal)} NxTON</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom id="repay page repayment box">
          <RepayListBottomTextBottomLeft id="repay page repayment box">Interest rate</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight id="repay page repayment box">{interestRate}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom id="repay page repayment box">
          <RepayListBottomTextBottomLeft id="repay page repayment box">LTV</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight id="repay page repayment box">{limitDecimals(ltv*100,2)}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      </RepayListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
