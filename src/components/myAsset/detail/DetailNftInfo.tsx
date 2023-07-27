import styled from "styled-components";
import DetailTitle from "./common/DetailTitle";
import DetailInfoList from "./common/DetailInfoList";
import useTonConnect from "../../../hooks/useTonConnect";

const DetailNftInfo = () => {
  const { address } = useTonConnect();

  return (
    <DetailNftInfoWrapper>
      <DetailTitle title="NFT Info" />
      <DetailInfoList title="Token ID" desc="0001" />
      <DetailInfoList title="Token Standard" desc="TEP 62" />
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
