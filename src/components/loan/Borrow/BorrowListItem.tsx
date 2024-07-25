import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { nftInfo } from "@/types/Nft";
import { DDayChange, expiredDateChanger } from "@/utils/dateChanger";
import { numberCutter } from "@/utils/numberCutter";

interface BorrowListProps {
  item: nftInfo;
}

const BorrowListItem = (props: BorrowListProps) => {
  const { nftId, amount, timeStamp, lockPeriod } = props.item;

  const navigate = useNavigate();

  return (
    <BorrowListItemWrapper onClick={() => navigate(`/loan/${nftId}`)}>
      <BorrowListTop>
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
      </BorrowListTop>

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

  cursor: pointer;

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
      ? `linear-gradient(217deg, rgba(61, 80, 255, 0.00) 9.1%, #C7CAE9 88.74%), url("./src/assets/image/Loan/OngoingNFTItem.png") lightgray 50% / cover no-repeat`
      : type === "forthComing"
        ? `linear-gradient(217deg, rgba(255, 93, 57, 0.00) 57.93%, #FF5D39 88.74%), url("./src/assets/image/Loan/ForthcomingNFTItem.png") lightgray 50% / cover no-repeat;`
        : `linear-gradient(217deg, rgba(255, 255, 255, 0.00) 35.65%, #A4A4A4 88.74%), url("./src/assets/image/Loan/ExpiredNFTItem.png") lightgray 50% / cover no-repeat`};
`;

const BorrowListTopLeftText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;

  margin-left: 1.6rem;
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
