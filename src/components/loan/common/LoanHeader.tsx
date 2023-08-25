import { styled } from "styled-components";
import BackButton from "../../common/BackButton";
import { useNavigate } from "react-router-dom";

const LoanHeader = ({ type }: { type?: string }) => {
  const navigate = useNavigate();

  const handleMoveMain = () => {
    navigate("/");
  };
  return (
    <>
      {type === "detail" ? (
        <LoanHeaderTop>Deposit NFT, Borrow $NXT</LoanHeaderTop>
      ) : (
        <LoanHeaderBox>
          <BackButton loanMain handleMoveMain={handleMoveMain} />
          <LoanHeaderTop>Deposit NFT, Borrow $NXT</LoanHeaderTop>
        </LoanHeaderBox>
      )}
      <LoanHeaderDescBox>
        <LoanHeaderDesc>
          By depositing your NFT, you can borrow NXT and stake
        </LoanHeaderDesc>
        <LoanHeaderDesc>
          this to extra pay - offs, all without risking the liquidation of
        </LoanHeaderDesc>
        <LoanHeaderDesc>your deposited NFT.</LoanHeaderDesc>
      </LoanHeaderDescBox>
    </>
  );
};

export default LoanHeader;

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
