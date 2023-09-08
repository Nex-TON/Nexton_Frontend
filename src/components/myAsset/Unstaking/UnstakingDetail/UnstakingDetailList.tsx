import { styled } from "styled-components";
import UnstakingDetailItem from "./UnstakingDetailItem";
import { nftInfo } from "../../../../types/Nft";

interface UnstakingDetailListProps {
  item: nftInfo[];
}

const UnstakingDetailList = (props: UnstakingDetailListProps) => {
  const { item } = props;

  return (
    <UnstkaingDetailListWrapper>
      {item
        .sort((a: any, b: any) => b.timeStamp - a.timeStamp)
        .map((data) => (
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
