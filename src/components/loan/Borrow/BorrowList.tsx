import { useNavigate } from "react-router-dom";

import IcArrowRight from "@/assets/icons/Loan/ic_arrow_right.svg";
import NFTsEmpty from "@/assets/image/Loan/NFTsEmpty.png";
import { FilterNFTs } from "@/pages/Loan/Loan";
import { nftInfo } from "@/types/Nft";
import NftItem from "@/components/myAsset/NFT/NftItem";

import {
  NFTItemWrapper,
  // BorrowListItemBox,
  BorrowListWrapper,
  LoanNFTBoxListEmpty,
  LoanNFTBoxListEmptyLink,
} from "./BorrowList.styled";

// ! Data is currently mocked
const BorrowList = ({ filter, nftList }: { filter?: FilterNFTs; nftList: nftInfo[] }) => {
  const navigate = useNavigate();

  return (
    <BorrowListWrapper>
      {nftList && nftList.length > 0 ? (
        <NFTItemWrapper>
          {nftList
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .map(item => (
              <NftItem key={item.nftId} item={item} />
            ))}
        </NFTItemWrapper>
      ) : (
        <LoanNFTBoxListEmpty>
          <img src={NFTsEmpty} alt="nfts_empty" />

          <h2>No results</h2>
          <LoanNFTBoxListEmptyLink onClick={() => navigate("/stake/amount")}>
            Let’s move to staking to get new NFT <img src={IcArrowRight} alt="arrow_right" />
          </LoanNFTBoxListEmptyLink>
        </LoanNFTBoxListEmpty>
      )}
    </BorrowListWrapper>
  );
};

export default BorrowList;