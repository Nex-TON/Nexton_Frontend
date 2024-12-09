import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { numberCutter } from "@/utils/numberCutter";
import { Caption3 } from "../Borrow/BorrowListItem.styled";
import IcPaid from "@/assets/icons/Loan/ic_paid_off.svg";
import IcUnpaid from "@/assets/icons/Loan/ic_unpaid.svg";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import useTonConnect from "@/hooks/contract/useTonConnect";

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

const HistoryListItem = status => {
  const navigate = useNavigate();
  const { address } = useTonConnect();
  const paid = true;
  const { borrowList } = useRepayNftList(address);

  return (
    <HistoryListItemWrapper onClick={() => navigate("/loan/1/repay/details")}>
      <HistoryListTop>
        <HistoryListTopLeft>
          <HistoryListTopLeftIcon>1</HistoryListTopLeftIcon>
          <HistoryListTopLeftText>
            <Caption3>Borrowed</Caption3>
            <p>
              <span>000.00 </span>nxTON
            </p>
          </HistoryListTopLeftText>
        </HistoryListTopLeft>

        <HistoryListTopStatus onClick={() => navigate("")} paid={status}>
          <img src={paid ? IcPaid : IcUnpaid} />
          <p>{paid ? "Paid off" : "Unpaid"}</p>
        </HistoryListTopStatus>
      </HistoryListTop>
      <HistoryListBottom>
        <HistoryListBottomTextBottom>
          <HistoryListBottomTextBottomLeft>Principal</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight>
            {numberCutter(borrowList[0]?.principal)} nxTON
          </HistoryListBottomTextBottomRight>
        </HistoryListBottomTextBottom>
        <HistoryListItemDivider />
        <HistoryListBottomTextBottom>
          <HistoryListBottomTextBottomLeft>Interest rate</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight>2%</HistoryListBottomTextBottomRight>
        </HistoryListBottomTextBottom>
        <HistoryListItemDivider />
        <HistoryListBottomTextBottom>
          <HistoryListBottomTextBottomLeft>LTV</HistoryListBottomTextBottomLeft>
          <HistoryListBottomTextBottomRight>95.0%</HistoryListBottomTextBottomRight>
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
