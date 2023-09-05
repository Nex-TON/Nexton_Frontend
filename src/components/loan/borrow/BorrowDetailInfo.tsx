import { styled } from "styled-components";
import { NftStatus } from "../common/Nftstatus";
import IcLoanEqual from "../../../assets/icons/Loan/ic_loan_equal.svg";
import { useParams } from "react-router-dom";
import { getNFTDetail } from "../../../api/getNFTDetail";
import { useEffect, useState } from "react";
import { numberCutter } from "../../../utils/numberCutter";
import { DDayChange, expiredDateChanger } from "../../../utils/dateChanger";

const BorrowDetailInfo = () => {
  const { id } = useParams();
  const [stakedNftDetail, setStakedNftDetail] = useState([]);

  const getStakedNftDetail = async () => {
    const response = await getNFTDetail(Number(id));
    setStakedNftDetail(response);
  };

  useEffect(() => {
    getStakedNftDetail();
  }, [id]);

  return (
    stakedNftDetail &&
    stakedNftDetail.length > 0 && (
      <>
        <BorrowDetailInfoWrapper>
          <BorrowDetailInfoTop>
            <BodyTextMedium2>Collateralizing NFT info</BodyTextMedium2>
            <BorrowDetailInfoTopNftBox>
              {DDayChange(
                stakedNftDetail[0].timeStamp,
                stakedNftDetail[0].lockPeriod
              ) > 55 ? (
                <NftStatus
                  type="ongoing"
                  style={{ width: "1.6rem", height: "1.6rem" }}
                />
              ) : DDayChange(
                  stakedNftDetail[0].timeStamp,
                  stakedNftDetail[0].lockPeriod
                ) === 0 ? (
                <NftStatus
                  type="expired"
                  style={{ width: "1.6rem", height: "1.6rem" }}
                />
              ) : (
                <NftStatus
                  type="forthComing"
                  style={{ width: "1.6rem", height: "1.6rem" }}
                />
              )}
              NFT {String(stakedNftDetail[0].nftId).padStart(5, "0")}
            </BorrowDetailInfoTopNftBox>
          </BorrowDetailInfoTop>
          <BorrowListBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Principal</Caption3>
              <LabelMedium>
                {numberCutter(stakedNftDetail[0].amount)} TON
              </LabelMedium>
            </BorrowListBottomTextBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Evaluation</Caption3>
              <LabelMedium>
                {numberCutter(stakedNftDetail[0].amount)} TON
              </LabelMedium>
            </BorrowListBottomTextBottom>
            <BorrowListBottomTextBottom>
              <Caption3>Expired date</Caption3>
              <LabelMedium>
                {expiredDateChanger(
                  stakedNftDetail[0].timeStamp,
                  stakedNftDetail[0].lockPeriod,
                  "detail"
                )}
              </LabelMedium>
            </BorrowListBottomTextBottom>
          </BorrowListBottom>
        </BorrowDetailInfoWrapper>
        <BorrowLTVBox>
          <BorrowShadowBox>
            <BodyTextMedium2 style={{ marginBottom: "1.6rem" }}>
              LTV
            </BodyTextMedium2>
            <BodyTextMedium2 style={{ textAlign: "right" }}>
              80%
            </BodyTextMedium2>
          </BorrowShadowBox>
          <img src={IcLoanEqual} alt="equal" />
          <BorrowShadowBox type="right">
            <BorrowShadowInnerBox>
              <BodyTextMedium2>Borrow</BodyTextMedium2>
              <Caption3>1NXT = n TON</Caption3>
            </BorrowShadowInnerBox>
            <BorrowShadowInnerBox>
              <BodyTextMedium2>
                {numberCutter(stakedNftDetail[0].amount * 0.8)}
              </BodyTextMedium2>
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

  border-radius: 2rem;
  box-shadow: 0px 4px 6px 0px rgba(225, 228, 230, 0.5);
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
  background-color: #f9f9ff;
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
  background-color: #f2f2f7;
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

  border-radius: 2rem;
  background-color: #f9f9ff;
  box-shadow: 0px 4px 6px 0px rgba(225, 228, 230, 0.5);
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
