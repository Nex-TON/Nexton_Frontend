import { useNavigate } from "react-router-dom";

import { numberCutter } from "@/utils/numberCutter";

import { Caption3, LabelMedium } from "../Borrow/BorrowListItem.styled";

import {
  HistoryListBottom,
  HistoryListBottomTextBottom,
  HistoryListItemDivider,
  HistoryListItemWrapper,
  HistoryListTop,
  HistoryListTopButton,
  HistoryListTopLeft,
} from "./HistoryListItem.styled";

const HistoryListItem = () => {
  const navigate = useNavigate();

  return (
    <HistoryListItemWrapper onClick={() => navigate("/loan/1/history/details")}>
      <HistoryListTop>
        <HistoryListTopLeft>
          <p>Loan 1</p>
        </HistoryListTopLeft>

        <HistoryListTopButton onClick={() => navigate("/loan/1/history/details")}>Paid off</HistoryListTopButton>
      </HistoryListTop>

      <HistoryListItemDivider />

      <HistoryListBottom>
        <HistoryListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>{numberCutter(123.42)} TON</LabelMedium>
        </HistoryListBottomTextBottom>
        <HistoryListBottomTextBottom>
          <Caption3>Expired date</Caption3>
          <LabelMedium>mm.dd.yy</LabelMedium>
        </HistoryListBottomTextBottom>
        <HistoryListBottomTextBottom>
          <Caption3>max. LTV</Caption3>
          <LabelMedium>95.0%</LabelMedium>
        </HistoryListBottomTextBottom>
      </HistoryListBottom>
    </HistoryListItemWrapper>
  );
};

export default HistoryListItem;
