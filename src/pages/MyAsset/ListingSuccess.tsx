import { styled } from "styled-components";
import SaleNftWithTitle from "../../components/myAsset/Sale/SaleNftWithTitle";
import { useRecoilValue } from "recoil";
import { nftInfoAtom } from "../../lib/atom/nftInfo";
import IcSuccess from "../../assets/icons/MyAsset/ic_success.svg";
import IcArrowRight from "../../assets/icons/MyAsset/ic_arrow_right.svg";


const ListingSuccess = () => {
  const navigate = useNavigate();
  const nftInfo = useRecoilValue(nftInfoAtom);
  const { nftId, amount, leverage, timeStamp, lockPeriod, nominator, status } =
    nftInfo;

  const saleNftProps = {
    titleText: "Successfully listed!",
    amount: amount,
    timeStamp: timeStamp,
    lockPeriod: lockPeriod,
    icon: IcSuccess,
  };


  return (
    <RootWrapper>
      <SaleNftWithTitle {...saleNftProps} />
      <ContentWrapper>
        <PriceListWrapper>
          <PriceWrapper>
            <PriceLabelText>Total Value</PriceLabelText>
            <PriceValueWrapper>
              <PriceValueText>4,125.33</PriceValueText>
              <PriceValueText>TON</PriceValueText>
            </PriceValueWrapper>
          </PriceWrapper>
          <PriceWrapper>
            <PriceLabelText>Listed Price</PriceLabelText>
            <PriceValueWrapper>
              <PriceValueText>4,125.33</PriceValueText>
              <PriceValueText>TON</PriceValueText>
            </PriceValueWrapper>
          </PriceWrapper>
        </PriceListWrapper>
        <MarketplaceBtn>
          <span>Go to Marketplace</span>
          <img src={IcArrowRight} alt="ArrowIcon" />
        </MarketplaceBtn>
        <button onClick={() => navigate(`/myasset/nftlist`)}>Confirm</button>
      </ContentWrapper>
    </RootWrapper>
  );
};

export default ListingSuccess;

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
  padding: 2.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: #fff;
`;

const PriceListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceLabelText = styled.span`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

const PriceValueWrapper = styled.div`
  border-radius: 3rem;
  border: 0.1rem solid #e5e5ea;
  background: #fff;

  min-width: 20rem;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

const PriceValueText = styled.span`
  color: #1a1b23;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
`;

const MarketplaceBtn = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 1.4rem;
  gap: 0.5rem;
  border-radius: 3rem;
  color: #fff;
  background-color: #333;
  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  }
`;
