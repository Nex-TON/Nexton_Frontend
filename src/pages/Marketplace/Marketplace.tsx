import styled from "styled-components";
import { useState } from "react";
import Header from "../../components/common/Header";

const Marketplace = () => {

  return (
    <MarketplaceWrapper>
      <Header isOpen={false} backgroundType={false} text="Marketplace" />
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
