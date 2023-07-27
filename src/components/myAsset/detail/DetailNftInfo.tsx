import styled from "styled-components";
import DetailTitle from "./common/DetailTitle";
import DetailInfoList from "./common/DetailInfoList";

const DetailNftInfo = () => {
  return (
    <DetailNftInfoWrapper>
      <DetailTitle title="NFT Info" />
      <DetailInfoList title="Token ID" desc="542394...817863" />
      <DetailInfoList title="Token Standard" desc="???" />
      <DetailInfoList title="Network" desc="TON" />
    </DetailNftInfoWrapper>
  );
};

export default DetailNftInfo;

const DetailNftInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0 3.6rem;
`;
