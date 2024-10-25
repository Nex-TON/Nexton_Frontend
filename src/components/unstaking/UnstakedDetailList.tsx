import { styled } from "styled-components";

import RepaysEmpty from "@/assets/image/Loan/RepaysEmpty.png";
import { LoanNFTBoxListEmpty, LoanNFTBoxListEmptyLink } from "@/components/loan/Borrow/BorrowList.styled";
import { IUnstakedListData } from "@/hooks/api/unstaking/useUnstakedList";

import UnstakedDetailItem from "./UnstakedDetailItem";
//for the test
// import UnstakedDetailItemTest from "./UnstakedDetailItemTest";

const UnstakedDetailList = ({ unstakedList }: { unstakedList?: IUnstakedListData[] }) => {
  return (
    <UnstakedDetailListWrapper>
      {unstakedList ? (
        unstakedList?.map(data => <UnstakedDetailItem key={data.nftId} item={data} />)
      ) : (
        // for the test
        // <UnstakedDetailItemTest/>
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