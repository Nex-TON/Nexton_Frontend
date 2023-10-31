import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import SaleNftWithTitle from "../../components/myAsset/Sale/SaleNftWithTitle";
import { useState } from "react";
import ListingPriceInput from "../../components/myAsset/Sale/ListingPriceInput";
import RecommendPriceInfo from "../../components/myAsset/Sale/RecommendPriceInfo";
import FeeInfo from "../../components/myAsset/Sale/FeeInfo";
import { useRecoilValue } from "recoil";
import { nftInfoAtom } from "../../lib/atom/nftInfo";

const ListForSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const nftInfo = useRecoilValue(nftInfoAtom);
  const { nftId, amount, leverage, timeStamp, lockPeriod, nominator, status } =
    nftInfo;

  const [listingPrice, setListingPrice] = useState("");

  const saleNftProps = {
    titleText: "List For Sale",
    amount: amount,
    timeStamp: timeStamp,
    lockPeriod: lockPeriod,
  };

  const setInput = (input: string) => {
    setListingPrice(input);
  };

  return (
    <DetailWrapper>
      <SaleNftWithTitle {...saleNftProps} />
      <ContentWrapper>
        <ListingPriceInput input={listingPrice} setInput={setInput} />
        <RecommendPriceInfo principal={amount} />
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
