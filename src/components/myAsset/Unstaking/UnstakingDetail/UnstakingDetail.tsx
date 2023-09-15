import { styled } from "styled-components";
import UnstakingDetailHeader from "./UnstakingDetailHeader";
import UnstakingDetailList from "./UnstakingDetailList";
import { useUnstakingList } from "../../../../api/hooks/useUnstakingList";

const UnstakingDetail = () => {
  const { unstakingList } = useUnstakingList();

  return (
    <UnstakingDetailWrapper>
      <UnstakingDetailHeader UnstakingListLength={unstakingList?.length} />
      <UnstakingDetailList />
    </UnstakingDetailWrapper>
  );
};

export default UnstakingDetail;

const UnstakingDetailWrapper = styled.div`
  width: 100%;
`;
