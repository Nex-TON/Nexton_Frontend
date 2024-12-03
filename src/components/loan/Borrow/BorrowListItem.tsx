import { useNavigate } from "react-router-dom";

import ExpiredNFTItem from "@/assets/image/Loan/ExpiredNFTItem.png";
import ForthcomingNFTItem from "@/assets/image/Loan/ForthcomingNFTItem.png";
import OngoingNFTItem from "@/assets/image/Loan/OngoingNFTItem.png";
import { nftInfo } from "@/types/Nft";
import { getNftState } from "@/utils/getNftState";
import { numberCutter } from "@/utils/numberCutter";

import {
  BorrowListBottom,
  BorrowListBottomTextBottom,
  BorrowListItemDivider,
  BorrowListItemWrapper,
  BorrowListTop,
  BorrowListTopLeft,
  BorrowListTopLeftText,
  Caption3,
  LabelMedium,
  NFTStatus,
} from "./BorrowListItem.styled";

interface BorrowListProps {
  item: nftInfo;
}

const BorrowListItem = (props: BorrowListProps) => {
  const { nftId, principal, unstakableDate } = props.item;

  const navigate = useNavigate();

  return (
    <BorrowListItemWrapper onClick={() => navigate(`/myasset/${nftId}`)}>
      <BorrowListTop>
        <BorrowListTopLeft>
          {getNftState(unstakableDate) === "ongoing" ? (
            <NFTStatus src={OngoingNFTItem} />
          ) : (
            <NFTStatus src={ExpiredNFTItem} />
          )}
          <BorrowListTopLeftText>
            <Caption3>Token ID</Caption3>
            <p>{nftId}</p>
          </BorrowListTopLeftText>
        </BorrowListTopLeft>

        {/* Not finalized yet */}
        {/* <BorrowButton onClick={() => navigate(`/loan/${nftId}`)}>
          Borrow
          <img src={IcLoanArrow} alt="loan" />
        </BorrowButton> */}
      </BorrowListTop>

      <BorrowListItemDivider />

      <BorrowListBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Principal</Caption3>
          <LabelMedium>{numberCutter(principal)} TON</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>Expired date</Caption3>
          <LabelMedium>{new Date(unstakableDate).toLocaleDateString()}</LabelMedium>
        </BorrowListBottomTextBottom>
        <BorrowListBottomTextBottom>
          <Caption3>max LTV.</Caption3>
          <LabelMedium>95%</LabelMedium>
        </BorrowListBottomTextBottom>
      </BorrowListBottom>
    </BorrowListItemWrapper>
  );
};

export default BorrowListItem;
