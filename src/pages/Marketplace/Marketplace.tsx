import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import IcCart from "../../assets/icons/Marketplace/ic_headerCart.svg";
import BalanceInfo from "../../components/marketplace/BalanceInfo";
import SearchBar from "../../components/marketplace/SearchBar";
import ListedPosition from "../../components/marketplace/ListedPosition";
import { position } from "../../types/Nft";

const POSITION_DUMMY: position[] = [
  {
    nftId: 1,
    price: 2546356.05,
    maxValue: 3030000,
    lockPeriod: 60,
    timeStamp: "1698914417641",
  },
  {
    nftId: 2,
    price: 78,
    maxValue: 100,
    lockPeriod: 60,
    timeStamp: "1698390252479",
  },
  {
    nftId: 3,
    price: 918312388123.3,
    maxValue: 920000000000,
    lockPeriod: 60,
    timeStamp: "1698390252479",
  },
  {
    nftId: 4,
    price: 30,
    maxValue: 31.5609,
    lockPeriod: 60,
    timeStamp: "1698390252479",
  },
  {
    nftId: 5,
    price: 1235123,
    maxValue: 3030000,
    lockPeriod: 60,
    timeStamp: "1698390252479",
  },
];

const Marketplace = () => {
  const [searchValue, setSearchValue] = useState("");

  function searchBtnOnClick() {}

  return (
    <MarketplaceWrapper>
      <Header
        isOpen={false}
        backgroundType={false}
        text="Marketplace"
        icon={IcCart}
      />
      <InfoWrapper>
        <BalanceInfo />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onClick={searchBtnOnClick}
        />
      </InfoWrapper>
      <ListedPosition positions={[]} />
    </MarketplaceWrapper>
  );
};

export default Marketplace;

const MarketplaceWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;

  background-color: #fff;
`;

const InfoWrapper = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
