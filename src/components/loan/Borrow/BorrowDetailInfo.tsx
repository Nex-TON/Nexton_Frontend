import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import IcLoanEqual from "../../../assets/icons/Loan/ic_loan_equal.svg";
import { useNFTDetail } from "../../../hooks/api/useNFTDetail";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";
import { numberCutter } from "../../../utils/numberCutter";
import { NftStatus } from "../common/Nftstatus";

const BorrowDetailInfo = () => {
  const { id } = useParams();
  const { nftDetail } = useNFTDetail(Number(id));

  return (
    nftDetail && (
      <>
        <BorrowDetailInfoWrapper>
          <BorrowDetailInfoTop>
            <BodyTextMedium2>Collateralizing NFT info</BodyTextMedium2>
            <BorrowDetailInfoTopNftBox>
              {DDayChange(nftDetail[0].timeStamp, nftDetail[0].lockPeriod) > 55 ? (
                <NftStatus type="ongoing" style={{ width: "1.6rem", height: "1.6rem" }} />
              ) : DDayChange(nftDetail[0].timeStamp, nftDetail[0].lockPeriod) === 0 ? (
                <NftStatus type="expired" style={{ width: "1.6rem", height: "1.6rem" }} />
              ) : (
                <NftStatus type="forthComing" style={{ width: "1.6rem", height: "1.6rem" }} />
              )}
              NFT {String(nftDetail[0].nftId).padStart(5, "0")}
            </BorrowDetailInfoTopNftBox>
          </BorrowDetailInfoTop>
          <BorrowListBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Principal</Caption3>
              <LabelMedium>{numberCutter(nftDetail[0].amount)} TON</LabelMedium>
            </BorrowListBottomTextBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Evaluation</Caption3>
              <LabelMedium>{numberCutter(nftDetail[0].amount)} TON</LabelMedium>
            </BorrowListBottomTextBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Expired date</Caption3>
              <LabelMedium>{expiredDateChanger(nftDetail[0].timeStamp, nftDetail[0].lockPeriod, "detail")}</LabelMedium>
            </BorrowListBottomTextBottom>
          </BorrowListBottom>
        </BorrowDetailInfoWrapper>
        <BorrowLTVBox>
          <BorrowShadowBox>
            <BodyTextMedium2 style={{ marginBottom: "1.6rem" }}>LTV</BodyTextMedium2>
            <BodyTextMedium2 style={{ textAlign: "right" }}>80%</BodyTextMedium2>
          </BorrowShadowBox>
          <img src={IcLoanEqual} alt="equal" />
          <BorrowShadowBox type="right">
            <BorrowShadowInnerBox>
              <BodyTextMedium2>Borrow</BodyTextMedium2>
              <Caption3>1NXT = n TON</Caption3>
            </BorrowShadowInnerBox>
            <BorrowShadowInnerBox>
              <BodyTextMedium2>{numberCutter(nftDetail[0].amount * 0.8)}</BodyTextMedium2>
              <BodyTextMedium2>NXT</BodyTextMedium2>
            </BorrowShadowInnerBox>
          </BorrowShadowBox>
        </BorrowLTVBox>
      </>
    )
  );
};

export default BorrowDetailInfo;

const BorrowDetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;

  border: 0.1rem solid #f1f4f4;
  border-radius: 2rem;
`;

const BorrowDetailInfoTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;

  width: 100%;
  padding: 1.6rem 0 1.25rem 0;

  border-radius: 2rem 2rem 0 0;
  background-color: #fff;
`;

const BorrowDetailInfoTopNftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  color: #000;
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;
const BodyTextMedium2 = styled.span`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const BorrowListBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem 3.5rem;

  border-radius: 0 0 2rem 2rem;
  background-color: #f9f9ff;
`;

const BorrowListBottomTextBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
`;

const Caption3 = styled.span`
  ${({ theme }) => theme.fonts.Telegram_Caption_3};
`;

const LabelMedium = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;

const BorrowLTVBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  margin-top: 1rem;
`;

const BorrowShadowBox = styled.div<{ type?: string }>`
  display: flex;
  flex-direction: column;

  width: ${({ type }) => (type === "right" ? `55%` : `38%`)};
  padding: 1.6rem;

  border: 0.1rem solid #f1f4f4;
  border-radius: 2rem;
  background-color: #fff;
`;

const BorrowShadowInnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  width: 100%;

  & + & {
    margin-top: 1.6rem;
  }
`;
