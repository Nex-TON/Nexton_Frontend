import styled from "styled-components";
import DetailTitle from "./common/DetailTitle";
import DetailInfoList from "./common/DetailInfoList";

const DetailStakingInfo = () => {
  return (
    <DetailStakingInfoWrapper>
      <DetailTitle title="Staking info" />
      <DetailInfoList title="Principal" desc="40,000 TON" />
      <DetailInfoList title="leveraged" desc="x2.5" />
      <DetailInfoList title="Timelocks" desc="- days left" />
      <DetailInfoList title="Unstakable date" desc="dd / mm / yy" />
      <DetailInfoList title="Protocol Fees" desc="- TON" />
    </DetailStakingInfoWrapper>
  );
};

export default DetailStakingInfo;

const DetailStakingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: 2rem;
  margin-bottom: 4.2rem;
  padding: 0 3.6rem;
`;
