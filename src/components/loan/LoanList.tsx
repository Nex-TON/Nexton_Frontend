import { css, styled } from "styled-components";
import BorrowList from "./borrow/BorrowList";
import { useNavigate } from "react-router-dom";

const LoanList = () => {
  return (
    <LoanListWrapper>
      <LoanNav>
        <LoanNavButton>Borrowing</LoanNavButton>
        <LoanNavButton disabled type="repay">
          NFTs to repay
        </LoanNavButton>
      </LoanNav>
      <BorrowList />
    </LoanListWrapper>
  );
};

export default LoanList;

const LoanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const LoanNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
  margin-bottom: 1.8rem;
`;

const LoanNavButton = styled.button<{ type?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0.8rem 1rem;

  border: none;
  border-radius: 3rem;
  background-color: #f9f9ff;
  color: #007aff;
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};
  box-shadow: 0px 4px 4px 0px rgba(225, 228, 230, 0.5);

  ${({ type }) =>
    type === "repay" &&
    css`
      color: #76797a;
    `}

  cursor: pointer;
  outline: none;
`;
