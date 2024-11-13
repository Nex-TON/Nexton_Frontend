import styled from "styled-components";
import { useState } from "react";

import IcExcliamation from "@/assets/icons/Referral/ic_ exclamation.svg";
import IcRefersPoint from "@/assets/icons/Referral/ic_refer_points.svg";
import IcNXTPoint from "@/assets/icons/Referral/ic_nxt_points.svg";
import ReferralCoins from "@/assets/image/ReferralCoins.png";
import ReferralPointsImg from "@/assets/image/ReferralPoints.svg";


import Tooltip from "@mui/material/Tooltip";
import { ClickAwayListener } from "@mui/material";

export const ReferralPointsExplain = () => {
  const [nxtopen, setNxtOpen] = useState(false);

  const handleNxtTooltip = () => {
    setNxtOpen(!nxtopen);
  };
  const handleNxtTooltipClose = () => {
    setNxtOpen(false);
  };
  const [referopen, setReferOpen] = useState(false);

  const handleReferTooltip = () => {
    setReferOpen(!referopen);
  };
  const handleReferTooltipClose = () => {
    setReferOpen(false);
  };

  return (
    <ExplainWrapper>
      <ReferralIntroText>
        Invite a friend and earn points
        <br />
        for both you and your friend!
      </ReferralIntroText>
      <ReferralBoxWrapper>
        <ReferralBox>
          <ClickAwayListener onClickAway={handleNxtTooltipClose}>
            <ReferralBoxTop onClick={handleNxtTooltip}>
              <PointNameWrapper>
                <img src={IcNXTPoint} alt="referral page nxt point icon" />
                <h3>NXT Points</h3>
                <ReferralExplainTooltip
                  title={<NxtPointTooltip />}
                  open={nxtopen}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "black",
                        padding: "3.7rem 2.6rem 3.17rem 2.5rem",
                        borderRadius: "15px",
                        width: "320px",
                        height: "268px",
                      },
                    },
                    arrow: { sx: { color: "black", border: "none" } },
                  }}
                  arrow
                >
                  <img src={IcExcliamation} alt="QuestionIcon" id="referral page nxt points" />
                </ReferralExplainTooltip>
              </PointNameWrapper>
              <PointValueWrapper>
                <EarnedPoint>
                  10
                  <EarnedPointUnit>%</EarnedPointUnit>
                </EarnedPoint>
              </PointValueWrapper>
            </ReferralBoxTop>
          </ClickAwayListener>
          <PointExplain>
            Users earn Loyalty Points by staking $TON at a fixed hourly rate of 0.1 points per $TON.
          </PointExplain>
        </ReferralBox>
        <ClickAwayListener onClickAway={handleReferTooltipClose}>
        <ReferralBox onClick={handleReferTooltip}>
          <ReferralBoxTop>
            <PointNameWrapper>
              <img src={IcRefersPoint} alt="referral page refers point icon" />
              <h3>Refer Points</h3>
              <ReferralExplainTooltip
                title={<ReferPointTooltip />}
                open={referopen}
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "black",
                      padding: "3.7rem 2.6rem 3.17rem 2.5rem",
                      borderRadius: "15px",
                      width: "320px",
                      height: "329px",
                    },
                  },
                  arrow: { sx: { color: "black", border: "none" } },
                }}
                arrow
              >
                <img src={IcExcliamation} alt="QuestionIcon" id="referral page refer points" />
              </ReferralExplainTooltip>
            </PointNameWrapper>
            <EarnedPoint>
              10 <EarnedPointUnit>Points</EarnedPointUnit>
            </EarnedPoint>
          </ReferralBoxTop>
          <PointExplain>Users earn 10 points each when friends stake at least 1 $TON via Nexton. </PointExplain>
        </ReferralBox>
        </ClickAwayListener>
      </ReferralBoxWrapper>
    </ExplainWrapper>
  );
};

const NxtPointTooltip = () => {
  return (
    <TooltipWrapper>
      <TooltipTitle>NXT Points</TooltipTitle>
      <img src={ReferralCoins} alt="referral tooltip nxt points" style={{width:"109.687px",height:"59.261px"}}/>
      <TooltipText>
        <li>Each hour, a fixed number of Loyalty Points is given per $TON staked.</li>
        <li>The number of points a user receives is directly tied to their staked amount.</li>
      </TooltipText>
    </TooltipWrapper>
  );
};

const ReferPointTooltip = () => {
  return (
    <TooltipWrapper>
      <TooltipTitle>Refer Points</TooltipTitle>
      <img src={ReferralPointsImg} alt="referral tooltip nxt points" style={{width:"186.464px", height:"49px",marginTop:"15px"}}/>
      <TooltipText>
        <li>Each staker who stakes at least 1 $TON earns 10 Referral Points for themselves.</li>
        <li>The referrer also earns 10 Referral Points.</li>
        <li>If the referred person refers another person, the original referrer earns an additional 5 Referral Points.</li>
      </TooltipText>
    </TooltipWrapper>
  );
};

const ReferralExplainTooltip = styled(Tooltip)``;

const TooltipText = styled.div`
  color: #c6c5d0;
  li {
    margin-left: 1.8rem;
    margin-bottom: 1.2rem;
    ${({ theme }) => theme.fonts.Nexton_Label_Small};
    text-indent: -1.8rem;
  }
`;

const TooltipTitle = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  margin-bottom: 0.8rem;
`;

const TooltipWrapper = styled.div`
  img {
    margin-bottom: 2.2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PointExplain = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Label_Small}
`;

const PointNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
`;

const PointValueWrapper = styled.div``;

const ReferralBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReferralBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 113px;

  padding: 14px 22px;
  border-radius: 20px;

  background-color: #fff;
  text-align: start;

  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);

  h3 {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
    color: #303234;
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #76797a;
    text-align: end;
  }
`;

const ReferralBoxTop = styled.div`
  width: 100%;
  display: flex;
  gap: 7px;
  align-items: start;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const ReferralIntroText = styled.div`
  margin-bottom: 24px;
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium};
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
