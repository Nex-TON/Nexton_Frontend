import RepaysEmpty from "@/assets/image/Loan/RepaysEmpty.png";

import {
  BorrowListItemBox,
  BorrowListWrapper,
  LoanNFTBoxListEmpty,
  LoanNFTBoxListEmptyLink,
} from "../Borrow/BorrowList.styled";

import RepayListItem from "./RepayListItem";
import { borrowNftInfo } from "@/types/ReapyNftList";

// const _RepaysMock = [
//   {
//     nftId: 1,
//     amount: 1000,
//     due: "2025-03-01T12:00:00Z",
//   },
//   {
//     nftId: 2,
//     amount: 3000,
//     due: "2025-04-01T12:00:00Z",
//   },
//   {
//     nftId: 3,
//     amount: 3100,
//     due: "2025-06-01T12:00:00Z",
//   },
// ];

// ! Data is currently mocked
const RepayList = ({borrowList}:{borrowList:borrowNftInfo[]}) => {
  return (
    <BorrowListWrapper>
      {borrowList && borrowList.length > 0 ? (
        <BorrowListItemBox>
          {borrowList
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .map(item => (
              <RepayListItem />
            ))}
        </BorrowListItemBox>
      ) : (
        <LoanNFTBoxListEmpty>
          <img src={RepaysEmpty} alt="repays_empty" />

          <h2>No results</h2>
          <LoanNFTBoxListEmptyLink>There are no borrowed records.</LoanNFTBoxListEmptyLink>
        </LoanNFTBoxListEmpty>
      )}
    </BorrowListWrapper>
  );
};

export default RepayList;
