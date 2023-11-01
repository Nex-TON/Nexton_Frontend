import styled from "styled-components";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import IcCart from "../../assets/icons/Marketplace/ic_headerCart.svg";
import BalanceInfo from "../../components/marketplace/BalanceInfo";
import SearchBar from "../../components/marketplace/SearchBar";

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
