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
      <RepayListTop>
        <RepayListTopLeft>
          <RepayListTopLeftIcon>{loanId}</RepayListTopLeftIcon>
          <RepayListTopLeftText>
            <Caption3>Borrowed</Caption3>
            <p>
              <span>{limitDecimals(principal,3)} </span>NxTON
            </p>
          </RepayListTopLeftText>
        </RepayListTopLeft>

        <RepayListTopButton onClick={() => navigate(`/loan/${nftId}/repay/details`)} id="repay page repayment button">Repayment</RepayListTopButton>
      </RepayListTop>
      <RepayListBottom>
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Principal</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{numberCutter(principal)} NxTON</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>Interest rate</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{interestRate}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      <RepayListItemDivider />
        <RepayListBottomTextBottom>
          <RepayListBottomTextBottomLeft>LTV</RepayListBottomTextBottomLeft>
          <RepayListBottomTextBottomRight>{limitDecimals(ltv*100,2)}%</RepayListBottomTextBottomRight>
        </RepayListBottomTextBottom>
      </RepayListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
