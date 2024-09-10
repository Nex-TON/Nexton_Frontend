import { styled } from "styled-components";

import RepaysEmpty from "@/assets/image/Loan/RepaysEmpty.png";
import { LoanNFTBoxListEmpty, LoanNFTBoxListEmptyLink } from "@/components/loan/Borrow/BorrowList.styled";
import { useUnstakingList } from "@/pages/MyAsset/hooks/useUnstakingList";

import UnstakedDetailItem from "./UnstakedDetailItem";

const UnstakedDetailList = () => {
  const { unstakingList } = useUnstakingList();

  return (
    <UnstakedDetailListWrapper>
      {unstakingList ? (
        unstakingList
          ?.sort((a: any, b: any) => b.timeStamp - a.timeStamp)
          ?.map(data => <UnstakedDetailItem key={data.nftId} item={data} />)
      ) : (
        <UnstakedDetailListEmpty>
          <img src={RepaysEmpty} alt="unstaked_empty" />

          <h2>No results</h2>
          <UnstakedDetailListEmptyLink>There is no record of unstaking.</UnstakedDetailListEmptyLink>
        </UnstakedDetailListEmpty>
      )}
    </UnstakedDetailListWrapper>
  );
};

export default UnstakedDetailList;

const UnstakedDetailListWrapper = styled.div`
  width: 100%;
  padding-top: 1rem;
`;

const UnstakedDetailListEmpty = styled(LoanNFTBoxListEmpty)`
  padding-top: 1rem;
`;

const UnstakedDetailListEmptyLink = styled(LoanNFTBoxListEmptyLink)`
  cursor: default;
`;
