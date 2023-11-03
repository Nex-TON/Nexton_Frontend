import styled, { keyframes } from "styled-components";
import SaleNftWithTitle from "../../components/myAsset/Sale/SaleNftWithTitle";
import { useParams } from "react-router-dom";
import IcCart from "../../assets/icons/Marketplace/ic_nftCart.svg";
import IcChevron from "../../assets/icons/Marketplace/ic_chevronUp.svg";
import IcTon from "../../assets/icons/Swap/ic_ton.svg";
import { numberCutter } from "../../utils/numberCutter";
import { useState } from "react";

const BuyDetail = () => {
  const { id } = useParams();
  const [isInfoOpen, setIsInfoOpen] = useState([true, true]);

  const toggleInfo = (index: number) => {
    setIsInfoOpen(
      isInfoOpen.map((item, idx) => (idx === index ? !item : item))
    );
  };

  const saleNftProps = {
    titleText: `Token ID : ${id}`,
    amount: 2546356.05,
    timeStamp: "1698914417641",
    lockPeriod: 60,
    icon: IcCart,
  };

  return (
    <RootWrapper>
      <SaleNftWithTitle {...saleNftProps} />
      <ContentWrapper>
        <PriceListWrapper>
          <PriceWrapper>
            <PriceLabelText>You will pay</PriceLabelText>
            <PriceValueWrapper>
              <PriceValueText>{numberCutter(2546356.05)}</PriceValueText>
              <PriceValueText>TON</PriceValueText>
            </PriceValueWrapper>
          </PriceWrapper>
          <PriceWrapper>
            <PriceLabelText>Total Value</PriceLabelText>
            <PriceValueWrapper>
              <PriceValueText>{numberCutter(2546356.05)}</PriceValueText>
              <PriceValueText>TON</PriceValueText>
            </PriceValueWrapper>
          </PriceWrapper>
        </PriceListWrapper>

        <InfoWrapper>
          <InfoHeaderWrapper
            onClick={() => {
              toggleInfo(0);
            }}
          >
            <InfoHeaderText>NFT info</InfoHeaderText>
            <InfoHeaderIcon
              isOpen={isInfoOpen[0]}
              src={IcChevron}
              alt="Chevron"
            />
          </InfoHeaderWrapper>
          <InfoItemList isOpen={isInfoOpen[0]}>
            <InfoItem>
              <InfoText>Token ID</InfoText>
              <InfoText align="right">542394...817863</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Token Standard</InfoText>
              <InfoText align="right">???</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Network</InfoText>
              <InfoIconWrapper>
                <InfoIcon src={IcTon} alt="TON Symbol" />
                <InfoText align="right">TON</InfoText>
              </InfoIconWrapper>
            </InfoItem>
          </InfoItemList>
        </InfoWrapper>

        <InfoWrapper>
          <InfoHeaderWrapper
            onClick={() => {
              toggleInfo(1);
            }}
          >
            <InfoHeaderText>Staking info</InfoHeaderText>
            <InfoHeaderIcon
              isOpen={isInfoOpen[1]}
              src={IcChevron}
              alt="Chevron"
            />
          </InfoHeaderWrapper>
          <InfoItemList isOpen={isInfoOpen[1]}>
            <InfoItem>
              <InfoText>Principal</InfoText>
              <InfoText align="right">{numberCutter(10000)} TON</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Leveraged</InfoText>
              <InfoText align="right">X2.5</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Timelocks</InfoText>
              <InfoText align="right">Days Left</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Unstakable date</InfoText>
              <InfoText align="right">DD/MM/YY</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Protocol Fees</InfoText>
              <InfoText align="right">2%</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoText>Total Amount</InfoText>
              <InfoText align="right">{numberCutter(10083)} TON</InfoText>
            </InfoItem>
          </InfoItemList>
        </InfoWrapper>
      </ContentWrapper>
    </RootWrapper>
  );
};

export default BuyDetail;

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
  padding: 2rem 1.4rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: #fff;
`;

const PriceListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
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

const InfoWrapper = styled.div`
  width: 100%;
`;

const InfoHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1.2rem 1rem 1.3rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 2rem;
  background: #f2f2f7;
`;

const InfoHeaderText = styled.div`
  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const InfoHeaderIcon = styled.img<{ isOpen: boolean }>`
  width: 2rem;
  height: 2rem;
  animation: ${({ isOpen }) => (isOpen ? rotateChevronDown : rotateChevronUp)}
    0.5s forwards;
`;

const InfoItemList = styled.div<{ isOpen: boolean }>`
  width: 100%;
  padding-top: 1.4rem;
  display: ${({ isOpen }) => (isOpen ? "none" : "block")};
`;

const InfoItem = styled.div`
  display: flex;
  width: 100%;
  padding: 0.6rem 1.3rem;
  justify-content: space-between;
  align-items: center;
`;

const InfoText = styled.span<{ align?: string }>`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  ${({ align }) => (align ? `text-align: ${align}` : "min-width: 12rem;")};
`;

const InfoIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const InfoIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

const rotateChevronDown = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(180deg);
    }
`;
const rotateChevronUp = keyframes`
    0%{
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;
