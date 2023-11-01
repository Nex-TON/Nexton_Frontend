import styled from "styled-components";
import IcTonSymbol from "../../assets/icons/MyAsset/ic_tonSymbol.svg";
import ImgMyAsset from "../../assets/image/MarketplaceMyAsset.png";
import IcRight from "../../assets/icons/Marketplace/ic_chevronRight.svg";

const BalanceInfo = () => {
  return (
    <ContentWrapper>
      <div>
        <BalanceLabelText>Your Balance</BalanceLabelText>
        <BalanceValueWrapper>
          <BalanceValueText>164,564.656</BalanceValueText>
          <BalanceValueImg src={IcTonSymbol} alt="TON Icon" />
        </BalanceValueWrapper>
        <BalanceEstimatedValueText>≈ $329,214</BalanceEstimatedValueText>
      </div>
      <BtnWrapper>
        <MyAssetImg src={ImgMyAsset} alt="MyAssetIcon" />
        <GuideWrapper>
          <span>View Listings</span>
          <img src={IcRight} alt="ChevronRightIcon" />
        </GuideWrapper>
      </BtnWrapper>
    </ContentWrapper>
  );
};

export default BalanceInfo;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.1rem;
  border-radius: 3rem;
  background: #f2f2f7;
  box-shadow: 0 0.6rem 1rem 0px rgba(94, 97, 98, 0.3);
`;

const BalanceLabelText = styled.span`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
`;

const BalanceValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`;

const BalanceValueText = styled.span`
  color: #1a1b23;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;

const BalanceValueImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const BalanceEstimatedValueText = styled.span`
  color: #90909a;
  ${({ theme }) => theme.fonts.Nexton_Label_Small};
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const MyAssetImg = styled.img`
  width: 6rem;
  height: 6rem;
`;

const GuideWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #90909a;
    ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  }
  img {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
