import { styled } from "styled-components";
import UnstakingDetailHeader from "./UnstakingDetailHeader";
import UnstakingDetailList from "./UnstakingDetailList";

interface UnstakingDetailProps {
  handleMoveUnstakingDetail: () => void;
}

const UnstakingDetail = (props: UnstakingDetailProps) => {
  const { handleMoveUnstakingDetail } = props;

  return (
    <UnstakingDetailWrapper>
      <UnstakingDetailHeader
        handleMoveUnstakingDetail={handleMoveUnstakingDetail}
      />
      <UnstakingDetailList />
    </UnstakingDetailWrapper>
  );
};

export default UnstakingDetail;

const UnstakingDetailWrapper = styled.div`
  width: 100%;
`;
