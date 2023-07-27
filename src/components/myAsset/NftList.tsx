import styled from "styled-components";
import NftItem from "../common/NftItem";
import { useRecoilValue } from "recoil";
import { stakingAtom } from "../../lib/atom/staking";

const NftList = () => {
  const stakingInfo = useRecoilValue(stakingAtom);

  return (
    <NFtListWrapper>
      {stakingInfo.map(({ principal, leverage, lockup }, index) => (
        <NftItem
          key={index}
          idx={index}
          principal={principal}
          leverage={leverage}
          lockup={lockup}
        />
      ))}
    </NFtListWrapper>
  );
};

export default NftList;

const NFtListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  width: 100%;
  height: 50rem;
  padding: 1.6rem;
  margin-top: 2rem;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    margin-top: 3px;
    margin-bottom: 3px;
    background-clip: padding-box;
  }
`;
