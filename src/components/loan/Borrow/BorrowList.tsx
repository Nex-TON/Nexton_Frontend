import { styled } from "styled-components";

import IcArrowRight from "@/assets/icons/Loan/ic_arrow_right.svg";
import NFTsEmpty from "@/assets/image/Loan/NFTsEmpty.png";
import { useStakeInfo } from "@/hooks/api/useStakeInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { FilterNFTs } from "@/pages/Loan/Loan";
import { DDayChange } from "@/utils/dateChanger";

import BorrowListItem from "./BorrowListItem";

const _NFTsMock = [
  {
    nftId: 1,
    amount: 1000,
    leverage: 2,
    lockPeriod: 55,
    timeStamp: "2024-03-01T12:00:00Z",
    nominator: "User1",
    status: 1,
  },
  {
    nftId: 2,
    amount: 500,
    leverage: 3,
    lockPeriod: 55,
    timeStamp: "2024-10-02T12:00:00Z",
    nominator: "User2",
    status: 2,
  },
  {
    nftId: 3,
    amount: 750,
    leverage: 1.5,
    lockPeriod: 55,
    timeStamp: "2024-07-03T12:00:00Z",
    nominator: "User3",
    status: 1,
  },
  {
    nftId: 4,
    amount: 1200,
    leverage: 2.5,
    lockPeriod: 55,
    timeStamp: "2023-07-04T12:00:00Z",
    nominator: "User4",
    status: 3,
  },
  {
    nftId: 5,
    amount: 300,
    leverage: 4,
    lockPeriod: 55,
    timeStamp: "2024-07-05T12:00:00Z",
    nominator: "User5",
    status: 0,
  },
];

const BorrowList = ({ filter }: { filter?: FilterNFTs }) => {
  const { address } = useTonConnect();
  const { nftList } = useStakeInfo(address);

  return (
    <BorrowListWrapper>
      {/* {nftList && nftList.length > 0 ? (
        nftList.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)).map(item => <p>{item.nftId}</p>)
      ) : (
        <LoanNFTBoxListEmpty>
          <img src={NFTsEmpty} alt="nfts_empty" />

          <h2>No results</h2>
          <LoanNFTBoxListEmptyLink>
            Let’s move to staking to get new NFT <img src={IcArrowRight} alt="arrow_right" />
          </LoanNFTBoxListEmptyLink>
        </LoanNFTBoxListEmpty>
      )} */}

      {/* // * Mocked data */}
      {_NFTsMock && _NFTsMock.length > 0 ? (
        <BorrowListItemBox>
          {_NFTsMock
            .sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
            .map(item => (
              <BorrowListItem key={item.nftId} item={item} />
            ))}
        </BorrowListItemBox>
      ) : (
        <LoanNFTBoxListEmpty>
          <img src={NFTsEmpty} alt="nfts_empty" />

          <h2>No results</h2>
          <LoanNFTBoxListEmptyLink>
            Let’s move to staking to get new NFT <img src={IcArrowRight} alt="arrow_right" />
          </LoanNFTBoxListEmptyLink>
        </LoanNFTBoxListEmpty>
      )}
    </BorrowListWrapper>
  );
};

export default BorrowList;

const BorrowListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BorrowListItemBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2.3rem 0;
`;

const LoanNFTBoxListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  margin-top: 5.7rem;

  h2 {
    ${({ theme }) => theme.fonts.Nexton_Title_Medium_2};
    color: #000;
    margin-top: 1.7rem;
  }
`;

const LoanNFTBoxListEmptyLink = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  color: #5d5e67;

  cursor: pointer;
`;
