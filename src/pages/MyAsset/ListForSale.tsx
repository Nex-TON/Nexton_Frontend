import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import SaleCardWithTitle from "../../components/myAsset/Sale/SaleCardWithTitle";
import { useState } from "react";
import ListingPriceInput from "../../components/myAsset/Sale/ListingPriceInput";
import RecommendPriceInfo from "../../components/myAsset/Sale/RecommendPriceInfo";
import FeeInfo from "../../components/myAsset/Sale/FeeInfo";

const ListForSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listingPrice, setListingPrice] = useState("");

  const setInput = (input: string) => {
    setListingPrice(input);
  };

  return (
    <DetailWrapper>
      <SaleCardWithTitle titleText={"List For Sale"} />
      <ContentWrapper>
        <ListingPriceInput input={listingPrice} setInput={setInput} />
        <RecommendPriceInfo />
        <FeeInfo />
      </ContentWrapper>
    </DetailWrapper>
  );
};

export default ListForSale;

const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a1b23;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  padding: 2rem 1.5rem 5rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: #fff;
`;
