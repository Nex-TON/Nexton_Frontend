import styled from "styled-components";

import IcNXTPoint from "@/assets/icons/Referral/ic_nxt_points.svg";
import IcRefersPoint from "@/assets/icons/Referral/ic_refer_points.svg";

interface ReferralEarnedProps{
    nxtPoints:number;
    referPoints:number;
}
export const ReferralEarned = ({nxtPoints,referPoints}:ReferralEarnedProps) => {
  return (
    <>
      <EarnedWrapper>
        <h3>Earned</h3>
        <EarnedContainer>
          <EarnedPointWrapper>
            <img src={IcNXTPoint} alt="earned nxt point icon" />
            <EarnedPoint>
              {nxtPoints}
              <EarnedPointUnit>NXT Points</EarnedPointUnit>
            </EarnedPoint>
          </EarnedPointWrapper>
          <EarnedDivision />
          <EarnedPointWrapper>
            <img src={IcRefersPoint} alt="earned refers point icon" />
            <EarnedPoint>
              {referPoints}
              <EarnedPointUnit>Refer Points</EarnedPointUnit>
            </EarnedPoint>
          </EarnedPointWrapper>
        </EarnedContainer>
      </EarnedWrapper>
    </>
  );
};

const EarnedDivision = styled.div`
  background: #e5e5ea;
  width: 100%;
  height: 1px;
`;

const EarnedPointUnit = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}
`;

const EarnedPoint = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;

const EarnedPointWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  img {
    width: 30px;
    height: 30px;
  }
`;

const EarnedContainer = styled.div`
  gap: 2.7rem;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
  height: 158px;
  padding: 2rem 1.9rem;

  border-radius: 15px;
  background: white;

  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const EarnedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  h3 {
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  }
`;