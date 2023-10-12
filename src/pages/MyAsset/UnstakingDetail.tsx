import { styled } from "styled-components";
import UnstakingDetailHeader from "../../components/myAsset/Unstaking/UnstakingDetail/UnstakingDetailHeader";
import UnstakingDetailList from "../../components/myAsset/Unstaking/UnstakingDetail/UnstakingDetailList";
import { useUnstakingList } from "./hooks/useUnstakingList";

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
