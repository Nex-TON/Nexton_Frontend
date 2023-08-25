import { styled } from "styled-components";
import IcLoanArrow from "../../../assets/icons/Loan/ic_loan_arrow.svg";
import { useNavigate } from "react-router-dom";
import { NftStatus } from "../common/Nftstatus";

const BorrowList = () => {
  const navigate = useNavigate();

  return (
    <BorrowLlistWrapper>
      <BorrowListTop>
        <BorrowListTopLeft>
          <NftStatus />
          <div>
            <Caption3 style={{ color: "#000" }}>NFT</Caption3>
            <LabelMedium style={{ color: "#000" }}> 0000</LabelMedium>
          </div>
          <div style={{ marginLeft: "1.4rem" }}>
            <Caption3>Max.LTV</Caption3>
            <LabelMedium> 80%</LabelMedium>
          </div>
        </BorrowListTopLeft>
        <BorrowButton onClick={() => navigate("/loan/1")}>
          Borrow
          <img src={IcLoanArrow} alt="loan" />
        </BorrowButton>
      </BorrowListTop>
      <BorrowListBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>0000 TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Evaluation</Caption3>
          <LabelMedium>0000 TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Expired date</Caption3>
          <LabelMedium>DD/MM/YY</LabelMedium>
        </BorrowListBottomTextBottom>
      </BorrowListBottom>
    </BorrowLlistWrapper>
  );
};

export default BorrowList;

const BorrowLlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  border-radius: 2rem;
  box-shadow: 0px 4px 6px 0px rgba(225, 228, 230, 0.5);

  & + & {
    margin-top: 1rem;
  }
`;

const BorrowListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.6rem;

  width: 100%;
  padding: 1.8rem 2.4rem;

  border-radius: 2rem 2rem 0 0;
  background-color: #f9f9ff;
`;

const BorrowListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 2.4rem;

  border-radius: 0 0 2rem 2rem;
  background-color: #f2f2f7;
`;

const BorrowListBottomTextBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
`;

const BorrowListTopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;
const Caption3 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const LabelMedium = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;

const BorrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  padding: 0.7rem 1.2rem;

  border: none;
  border-radius: 2rem;
  background-color: #007aff;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};

  outline: none;
  cursor: pointer;
`;
