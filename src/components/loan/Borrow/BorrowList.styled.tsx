import { styled } from "styled-components";

export const BorrowListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const BorrowListItemBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2.3rem 0;
`;

export const LoanNFTBoxListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  margin-top: 5.7rem;

  h2 {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
    color: #000;
    margin-top: 1.7rem;
  }
`;

export const LoanNFTBoxListEmptyLink = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #5d5e67;

  cursor: pointer;
`;