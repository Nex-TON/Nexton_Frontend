import { styled } from "styled-components";

import {
  BorrowListBottom,
  BorrowListBottomTextBottom,
  BorrowListItemDivider,
  BorrowListItemWrapper,
  BorrowListTop,
  BorrowListTopLeft,
  BorrowListTopLeftText,
} from "../Borrow/BorrowListItem.styled";

export const RepayListItemWrapper = styled(BorrowListItemWrapper)<{ $inactive?: boolean }>`
  background-color: ${({ $inactive }) => ($inactive ? "#F1F4F4" : "#fff")};
  cursor: ${({ $inactive }) => ($inactive ? "not-allowed" : "default")};

  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

export const RepayListTop = styled(BorrowListTop)`
  margin-bottom: 0.6rem;
`;

export const RepayListTopLeft = styled(BorrowListTopLeft)``;

export const RepayListTopLeftIcon = styled.div<{ $inactive?: boolean }>`
  display: flex;
  width: 39px;
  height: 32px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;
  background: ${({ $inactive }) => ($inactive ? "#fff" : "#f2f2f7")};

  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  color: ${({ $inactive }) => ($inactive ? "#B9B9BA" : "#303234")};
  text-align: center;
`;

export const RepayListTopLeftText = styled(BorrowListTopLeftText)``;

export const RepayListTopButton = styled.div<{ $inactive?: boolean }>`
  display: flex;
  height: 42px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 20px;
  background: ${({ $inactive }) => ($inactive ? "#E1E4E6" : "#1A1B23")};

  cursor: ${({ $inactive }) => ($inactive ? "not-allowed" : "pointer")};

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #fff;
`;

export const RepayListDueDate = styled.div<{ $inactive?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;

  gap: 0.6rem;
  margin-bottom: 1.1rem;

  span {
    color: #aaaeaf;
    ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  }

  p {
    color: ${({ $inactive }) => ($inactive ? "#FF7979" : "#303234")};
    ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  }
`;

export const RepayListItemDivider = styled(BorrowListItemDivider)``;

export const RepayListBottom = styled(BorrowListBottom)``;

export const RepayListBottomTextBottom = styled(BorrowListBottomTextBottom)``;
