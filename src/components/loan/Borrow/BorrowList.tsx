import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import IcLoanArrow from "../../../assets/icons/Loan/ic_loan_arrow.svg";
import { nftInfo } from "../../../types/Nft";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";
import { numberCutter } from "../../../utils/numberCutter";
import { NftStatus } from "../common/Nftstatus";

interface BorrowListProps {
  item: nftInfo;
}

const BorrowList = (props: BorrowListProps) => {
  const { nftId, amount, timeStamp, lockPeriod } = props.item;

  const navigate = useNavigate();

  return (
    <BorrowLlistWrapper>
      <BorrowListTop>
        <BorrowListTopLeft>
          {DDayChange(timeStamp, lockPeriod) > 55 ? (
            <NftStatus type="ongoing" />
          ) : DDayChange(timeStamp, lockPeriod) === 0 ? (
            <NftStatus type="expired" />
          ) : (
            <NftStatus type="forthComing" />
          )}
          <div>
            <Caption3 style={{ color: "#000" }}>NFT</Caption3>
            <LabelMedium style={{ color: "#000" }}>
              {" "}
              {String(nftId).padStart(5, "0")}
            </LabelMedium>
          </div>
          <div style={{ marginLeft: "1.4rem" }}>
            <Caption3>Max.LTV</Caption3>
            <LabelMedium> 80%</LabelMedium>
          </div>
        </BorrowListTopLeft>
        <BorrowButton onClick={() => navigate(`/loan/${nftId}`)}>
          Borrow
          <img src={IcLoanArrow} alt="loan" />
        </BorrowButton>
      </BorrowListTop>
      <BorrowListBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>{numberCutter(amount)} TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Evaluation</Caption3>
          <LabelMedium>{numberCutter(amount)} TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Expired date</Caption3>
          <LabelMedium>
            {expiredDateChanger(timeStamp, lockPeriod, "detail")}
          </LabelMedium>
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
  padding: 2.2rem;

  border: 0.1rem solid #e1e4e6;
  border-radius: 2rem;
  background-color: #fff;

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
  margin-bottom: 1.6rem;

  border-radius: 2rem 2rem 0 0;
`;

const BorrowListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  border-radius: 0 0 2rem 2rem;
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
  color: #303234;
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
