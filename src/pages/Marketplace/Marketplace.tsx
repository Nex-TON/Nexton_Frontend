import styled from "styled-components";
import { useState } from "react";
import Header from "../../components/common/Header";
import IcCart from "../../assets/icons/Marketplace/ic_header_cart.svg";

const Marketplace = () => {
  return (
    <MarketplaceWrapper>
      <Header
        isOpen={false}
        backgroundType={false}
        text="Marketplace"
        icon={IcCart}
      />
    </MarketplaceWrapper>
  );
};

export default Marketplace;

const MarketplaceWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;

  background-color: #f2f2f7;
`;
