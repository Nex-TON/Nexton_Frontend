import { styled } from "styled-components";
import UnstakingDetailItem from "./UnstakingDetailItem";
import { nftInfo } from "../../../../types/Nft";
import { useUnstakingList } from "../../../../api/hooks/useUnstakingList";

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  padding-top: 1rem;
`;
