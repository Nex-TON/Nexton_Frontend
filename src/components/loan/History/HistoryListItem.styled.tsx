import { styled } from "styled-components";

import { BorrowListBottom, BorrowListItemDivider } from "../Borrow/BorrowListItem.styled";
import { RepayListBottomTextBottom } from "../Repay/RepayListItem.styled";

export const HistoryListItemWrapper = styled.div<{ $inactive?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.7rem 2.1rem 1.9rem 2.1rem;

  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
  border-radius: 2rem;
  background-color: #fff;
  border-left: ${({ $inactive }) => ($inactive ? "0.7rem solid #E1E4E6" : "0.7rem solid #1f53ff")};

  cursor: pointer;

  & + & {
    margin-top: 1.4rem;
  }
`;

export const HistoryListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 1.2rem;
`;

export const HistoryListTopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    color: #303234;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const HistoryListTopButton = styled.div<{ $inactive?: boolean }>`
  display: inline-flex;
  height: 32px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 19px;
  background: ${({ $inactive }) => ($inactive ? "#F2F2F7" : "#1F53FF")};

  cursor: pointer;

  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  color: ${({ $inactive }) => ($inactive ? "#303234" : "#fff")};
`;

export const HistoryListItemDivider = styled(BorrowListItemDivider)``;

export const HistoryListBottom = styled(BorrowListBottom)``;

export const HistoryListBottomTextBottom = styled(RepayListBottomTextBottom)``;
