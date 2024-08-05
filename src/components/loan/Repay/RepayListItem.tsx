import { useNavigate } from "react-router-dom";

import { DDayChange, expiredDateChanger } from "@/utils/dateChanger";
import { numberCutter } from "@/utils/numberCutter";

import { RepayListItemWrapper, RepayListTop } from "./RepayListItem.styled";

const RepayListItem = () => {
  const navigate = useNavigate();

  return (
    <RepayListItemWrapper onClick={() => navigate(`/repay/${1}`)}>
      <RepayListTop>
        <BorrowListTopLeft>
          {DDayChange(timeStamp, lockPeriod) > 55 ? (
            <NFTStatus type="ongoing" />
          ) : DDayChange(timeStamp, lockPeriod) === 0 ? (
            <NFTStatus type="expired" />
          ) : (
            <NFTStatus type="forthComing" />
          )}
          <BorrowListTopLeftText>
            <Caption3>Token ID</Caption3>
            <p>{nftId}</p>
          </BorrowListTopLeftText>
        </BorrowListTopLeft>

        {/* Not finalized yet */}
        {/* <BorrowButton onClick={() => navigate(`/loan/${nftId}`)}>
          Borrow
          <img src={IcLoanArrow} alt="loan" />
        </BorrowButton> */}
      </RepayListTop>

      <BorrowListItemDivider />

      <BorrowListBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>{numberCutter(amount)} TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Expired date</Caption3>
          <LabelMedium>{expiredDateChanger(timeStamp, lockPeriod, "detail")}</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>max LTV.</Caption3>
          <LabelMedium>50%</LabelMedium>
        </BorrowListBottomTextBottom>
      </BorrowListBottom>
    </RepayListItemWrapper>
  );
};

export default RepayListItem;
