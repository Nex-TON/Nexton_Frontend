import { styled } from "styled-components";

import { useUnstakingList } from "@/pages/MyAsset/hooks/useUnstakingList";

import UnstakingDetailItem from "./UnstakingDetailItem";

const UnstakingDetailList = () => {
  const { unstakingList } = useUnstakingList();

  return (
    <UnstkaingDetailListWrapper>
      {unstakingList
        ?.sort((a: any, b: any) => b.timeStamp - a.timeStamp)
        ?.map((data) => (
          <UnstakingDetailItem key={data.nftId} item={data} />
        ))}
    </UnstkaingDetailListWrapper>
  );
};

export default UnstakingDetailList;

const UnstkaingDetailListWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
`;
