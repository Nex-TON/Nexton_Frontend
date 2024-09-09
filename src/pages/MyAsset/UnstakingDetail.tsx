import { styled } from "styled-components";

import UnstakedDetailHeader from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailHeader";
import UnstakedDetailList from "@/components/myAsset/Unstaking/UnstakingDetail/UnstakedDetailList";

import { useUnstakingList } from "./hooks/useUnstakingList";

// ! @deprecated
const UnstakingDetail = () => {
  const { unstakingList } = useUnstakingList();

  return (
    <UnstakingDetailWrapper>
      <UnstakedDetailHeader UnstakingListLength={unstakingList?.length} />
      <UnstakedDetailList />
    </UnstakingDetailWrapper>
  );
};

export default UnstakingDetail;

const UnstakingDetailWrapper = styled.div`
  width: 100%;
`;
