import { styled } from "styled-components";

import {
  BorrowHeaderBox,
  BorrowHeaderBoxTitle,
  BorrowRateBox,
  BorrowRateBoxBottom,
  BorrowRateBoxDivider,
  BorrowWrapper,
} from "../Borrow/BorrowDetails.styled";

export const RepaymentWrapper = styled(BorrowWrapper)``;

export const RepaymentHeaderBox = styled(BorrowHeaderBox)``;

export const RepaymentHeaderBoxTitle = styled(BorrowHeaderBoxTitle)``;

export const RepaymentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;

  margin-top: 3.1rem;
  padding-bottom: 4rem;
`;

export const RepayRateBox = styled(BorrowRateBox)``;

export const RepayRateBoxHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  color: #aaaeaf;
`;

export const RepayRateBoxDivider = styled(BorrowRateBoxDivider)`
  margin: 0.9rem 1.7rem 2.3rem 1.7rem;
`;

export const RepayRateBoxBottom = styled(BorrowRateBoxBottom)`
  color: #34c759;
`;
