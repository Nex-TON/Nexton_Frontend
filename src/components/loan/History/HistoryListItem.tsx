import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { numberCutter } from "@/utils/numberCutter";
import { Caption3 } from "../Borrow/BorrowListItem.styled";
import IcPaid from "@/assets/icons/Loan/ic_paid_off.svg";
import IcUnpaid from "@/assets/icons/Loan/ic_unpaid.svg";

import {
  RepayListBottomTextBottomRight,
  RepayListBottomTextBottomLeft,
  RepayListBottom,
  RepayListBottomTextBottom,
  RepayListItemDivider,
  RepayListItemWrapper,
  RepayListTop,
  RepayListTopLeft,
  RepayListTopLeftIcon,
  RepayListTopLeftText,
} from "../Repay/RepayListItem.styled";
import { limitDecimals } from "@/utils/limitDecimals";

interface HistoryListItemProps {
  status: number;
  principal: number;
  interestRate: number;
  ltv: number;
  loanId: number;
  nftId: number;
}

const HistoryListItem: React.FC<HistoryListItemProps> = ({ status, principal, interestRate, ltv, loanId, nftId }) => {
  const navigate = useNavigate();

  return (
    <HistoryListItemWrapper onClick={() => navigate(`/loan/${nftId}/repay/details`,{state:{loanId}})} id="loan history page borrowed box">
      <HistoryListTop id="loan history page borrowed box">
        <HistoryListTopLeft id="loan history page borrowed box">
          <HistoryListTopLeftIcon id="loan history page borrowed box">{loanId}</HistoryListTopLeftIcon>
          <HistoryListTopLeftText id="loan history page borrowed box">
            <Caption3 id="loan history page borrowed box">Borrowed</Caption3>
            <p id="loan history page borrowed box">
              <span id="loan history page borrowed box">{limitDecimals(principal, 3)} </span>NxTON
            </p>
          </HistoryListTopLeftText>
        </HistoryListTopLeft>
        {/* paid==0 unpaid 1은 paid off */}
        <HistoryListTopStatus id="loan history page borrowed box" onClick={() => navigate("")} paid={status == 1 ? true : false}>
          <img id="loan history page borrowed box" src={status == 1 ? IcPaid : IcUnpaid} />
          <p id="loan history page borrowed box">{status == 1 ? "Paid off" : "Unpaid"}</p>
        </HistoryListTopStatus>
      </HistoryListTop>
      <HistoryListBottom id="loan history page borrowed box">
        <HistoryListBottomTextBottom id="loan history page borrowed box">
          <HistoryListBottomTextBottomLeft id="loan history page borrowed box">Principal</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight id="loan history page borrowed box">{numberCutter(principal)} NxTON</HistoryListBottomTextBottomRight>
        </HistoryListBottomTextBottom>
        <HistoryListItemDivider />
        <HistoryListBottomTextBottom id="loan history page borrowed box">
          <HistoryListBottomTextBottomLeft id="loan history page borrowed box">Interest rate</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight id="loan history page borrowed box">{interestRate}%</HistoryListBottomTextBottomRight>
        </HistoryListBottomTextBottom>
        <HistoryListItemDivider />
        <HistoryListBottomTextBottom id="loan history page borrowed box">
          <HistoryListBottomTextBottomLeft id="loan history page borrowed box">LTV</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight id="loan history page borrowed box">{ltv}%</HistoryListBottomTextBottomRight>
        </HistoryListBottomTextBottom>
      </HistoryListBottom>
    </HistoryListItemWrapper>
  );
};
export default HistoryListItem;

const HistoryListItemWrapper = styled(RepayListItemWrapper)``;
const HistoryListBottomTextBottomRight = styled(RepayListBottomTextBottomRight)``;
const HistoryListBottomTextBottomLeft = styled(RepayListBottomTextBottomLeft)``;
const HistoryListBottom = styled(RepayListBottom)``;
const HistoryListBottomTextBottom = styled(RepayListBottomTextBottom)``;
const HistoryListItemDivider = styled(RepayListItemDivider)``;
const HistoryListTop = styled(RepayListTop)``;
const HistoryListTopStatus = styled.div<{ paid: boolean }>`
  color: ${({ paid }) => (paid ? "#34C759" : "#0C0F5E")};
  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
  gap: 9px;
  img {
    width: 24px;
    height: 24px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const HistoryListTopLeft = styled(RepayListTopLeft)``;
const HistoryListTopLeftIcon = styled(RepayListTopLeftIcon)``;
const HistoryListTopLeftText = styled(RepayListTopLeftText)``;
