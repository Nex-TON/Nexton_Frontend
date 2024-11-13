import styled from "styled-components";

interface ReferralStaticProps{
    referralNum:number;
}

export const ReferralStatistic = ({referralNum}:ReferralStaticProps) => {
  return (
    <>
      <StaticsWrapper>
        <h3>Your Statistic</h3>
        <StaticsBox>
          <ReferralStaticTitle>Referrals</ReferralStaticTitle>
          <ReferralStatic>{referralNum}</ReferralStatic>
        </StaticsBox>
      </StaticsWrapper>
    </>
  );
};

const ReferralStatic = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2}
`;

const ReferralStaticTitle = styled.div`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3}
`;

const StaticsBox = styled.div`
  display: flex;
  width: 100%;
  height: 76px;
  padding: 25px 19px;
  justify-content: space-between;
  align-items: center;

  border-radius: 15px;
  background: var(--Neutral-Neutural-100, #fff);
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const StaticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h3 {
    color: #2f3038;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  }
`;