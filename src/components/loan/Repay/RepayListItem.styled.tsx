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
  padding: 2.6rem 1.7rem 3rem 1.7rem;
`;

export const RepayListTop = styled(BorrowListTop)`
  margin-bottom: 0.6rem;
`;

export const RepayListTopLeft = styled(BorrowListTopLeft)``;

export const RepayListTopLeftIcon = styled.div<{ $inactive?: boolean }>`
  display: flex;
  width: 39px;
  height: 38px;
  padding: 2px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 1rem;
  background: ${({ $inactive }) => ($inactive ? "#fff" : "#f2f2f7")};

  color: var(--Neutral-Neutural-20, #303234);
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.14px;
`;

export const RepayListTopLeftText = styled.div`
  margin-left: 1.1rem;
  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
    color: #303234;
    span {
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
      color: #303234;
      font-weight: 700;
    }
  }
`;

export const RepayListTopButton = styled.div<{ $inactive?: boolean }>`
  display: flex;
  width: 112px;
  height: 37px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 1rem;
  background: ${({ $inactive }) => ($inactive ? "#E1E4E6" : "#1F53FF")};

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

export const RepayListBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  width: 100%;
`;

export const RepayListBottomTextBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1.3rem 0;
`;

export const RepayListBottomTextBottomRight = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
  color: #303234;
`;

export const RepayListBottomTextBottomLeft = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #c6caca;
`;
