import { styled } from "styled-components";

import { BorrowListItemWrapper, BorrowListTop } from "../Borrow/BorrowListItem.styled";

export const RepayListItemWrapper = styled(BorrowListItemWrapper)<{ $inactive?: boolean }>`
  background-color: ${({ $inactive }) => ($inactive ? "#F1F4F4" : "#fff")};
`;

export const RepayListTop = styled(BorrowListTop)``;
