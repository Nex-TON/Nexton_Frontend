import { styled } from "styled-components";

import { useUnstakingList } from "@/pages/MyAsset/hooks/useUnstakingList";

import UnstakedDetailItem from "./UnstakedDetailItem";

const UnstakedDetailList = () => {
  const { unstakingList } = useUnstakingList();

  return (
    <UnstakedDetailListWrapper>
      {unstakingList
        ?.sort((a: any, b: any) => b.timeStamp - a.timeStamp)
        ?.map(data => <UnstakedDetailItem key={data.nftId} item={data} />)}
    </UnstakedDetailListWrapper>
  );
};

export default UnstakedDetailList;

const UnstakedDetailListWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
`;
