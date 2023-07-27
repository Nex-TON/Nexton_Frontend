import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { stakingAtom } from "../../lib/atom/staking";

const NftHeader = () => {
  const stakingInfo = useRecoilValue(stakingAtom);
  return (
    <NftHeaderWrapper>
      <HeaderText style={{ paddingRight: "1.9rem" }}>Total NFT</HeaderText>
      <HeaderText>{stakingInfo?.length}</HeaderText>
    </NftHeaderWrapper>
  );
};

export default NftHeader;

const NftHeaderWrapper = styled.div`
  width: 100%;
  margin-top: 1.6rem;
  padding: 0.6rem 0 0.6rem 1.9rem;

  border-radius: 4rem;
  background-color: #f2f2f7;
`;

const HeaderText = styled.span`
  color: #5d5e67;

  font-family: Pretendard;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 510;
  line-height: 1.8rem; /* 138.462% */
  letter-spacing: -0.0078rem;
`;
