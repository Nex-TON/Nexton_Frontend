import { styled } from "styled-components";
import UnstakingDetailItem from "./UnstakingDetailItem";
import { useUnstakingList } from "../../../../hooks/api/useUnstakingList";

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
