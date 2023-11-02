import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import SaleNftWithTitle from "../../components/myAsset/Sale/SaleNftWithTitle";
import { useState, useEffect } from "react";
import ListingPriceInput from "../../components/myAsset/Sale/ListingPriceInput";
import RecommendPriceInfo from "../../components/myAsset/Sale/RecommendPriceInfo";
import FeeInfo from "../../components/myAsset/Sale/FeeInfo";
import { useRecoilValue } from "recoil";
import { nftInfoAtom } from "../../lib/atom/nftInfo";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

const tele = (window as any).Telegram.WebApp;

const ListForSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const nftInfo = useRecoilValue(nftInfoAtom);
  const { nftId, amount, leverage, timeStamp, lockPeriod, nominator, status } =
    nftInfo;

  const [listingPrice, setListingPrice] = useState("");

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate(`/myasset/${nftId}`);
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

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
    <RootWrapper>
      <SaleNftWithTitle {...saleNftProps} />
      <ContentWrapper>
        <ListingPriceInput input={listingPrice} setInput={setInput} />
        <RecommendPriceInfo principal={amount} />
        <FeeInfo />
        <button onClick={() => navigate(`/listing/success/${nftId}`)}>
          Complete Listing
        </button>
        <MainButton
          text="Complete Listing"
          onClick={() => navigate(`/listing/success/${nftId}`)}
        />
      </ContentWrapper>
    </RootWrapper>
  );
};

export default ListForSale;

const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1a1b23;
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: inline-flex;
  padding: 2rem 1.5rem 2rem 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: #fff;
`;