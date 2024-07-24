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

const BorrowListItem = (props: BorrowListProps) => {
  const { nftId, amount, timeStamp, lockPeriod } = props.item;

  const navigate = useNavigate();

  return (
    <BorrowListItemWrapper>
      <BorrowListTop>
        <BorrowListTopLeft>
          {/* to-do: change BG to .png */}
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

        <BorrowButton onClick={() => navigate(`/loan/${nftId}`)}>
          Borrow
          <img src={IcLoanArrow} alt="loan" />
        </BorrowButton>
      </BorrowListTop>

      <BorrowListItemDivider />

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
          <LabelMedium>{expiredDateChanger(timeStamp, lockPeriod, "detail")}</LabelMedium>
        </BorrowListBottomTextBottom>
      </BorrowListBottom>
    </BorrowListItemWrapper>
  );
};

export default BorrowListItem;

const BorrowListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.8rem 2.6rem;

  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
  border-radius: 2rem;
  background-color: #fff;

  & + & {
    margin-top: 1.4rem;
  }
`;

const BorrowListTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;

  width: 100%;
  margin-bottom: 1.2rem;
`;

const BorrowListTopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    color: rgba(48, 50, 52, 1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NFTStatus = styled.div<{ type?: string }>`
  width: 5rem;
  height: 5rem;

  border-radius: 1rem;
  background: ${({ type }) =>
    type === "ongoing"
      ? `linear-gradient(90deg, #61b5f2 0%, #98a1fe 100%)`
      : type === "forthComing"
        ? `linear-gradient(140deg, #FF8C73 2.52%, #FFE0B0 89.95%)`
        : `linear-gradient(127deg, #A2A9BC -17.44%, #E5EDFF 100%)`};
`;

const BorrowListTopLeftText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;
`;

const BorrowListItemDivider = styled.div`
  width: 100%;
  height: 0.1rem;

  background-color: rgba(241, 244, 244, 1);
`;

const BorrowListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  margin-top: 1.2rem;
`;

const BorrowListBottomTextBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
`;

const Caption3 = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
  color: rgba(170, 174, 175, 1);
`;

const LabelMedium = styled.p`
  color: #303234;
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 145.455% */
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
