import { styled } from "styled-components";
import LoanList from "../components/loan/LoanList";
import LoanHeader from "../components/loan/common/LoanHeader";

const Loan = () => {
  return (
    <LoanWrapper>
      <LoanHeader />
      <LoanList />
    </LoanWrapper>
  );
};

export default Loan;

const LoanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;

  padding: 2.9rem 1.3rem 2.9rem 1.3rem;
`;

const LoanHeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const LoanHeaderTop = styled.div`
  padding-top: 3rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Title_Large};
`;

const LoanHeaderDescBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 1.2rem;
  margin-bottom: 3.3rem;
`;

const LoanHeaderDesc = styled.span`
  color: #5e6162;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;
