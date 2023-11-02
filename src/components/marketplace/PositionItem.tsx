import styled from "styled-components";
import IdBgOngoing from "../../assets/image/IdBgOngoing.png";
import IdBgForthComing from "../../assets/image/IdBgForthComing.png";
import { position } from "../../types/Nft";
import { DDayChange, expiredDateChanger } from "../../utils/dateChanger";
import { numberCutter } from "../../utils/numberCutter";

interface PositionItemProps {
  item: position;
}

const PositionItem = (props: PositionItemProps) => {
  const { item } = props;
  const { nftId, price, maxValue, lockPeriod, timeStamp } = item;

  const SwitchNftIdImage = () => {
    console.log(`${nftId} : time : ${DDayChange(timeStamp, lockPeriod)}`);
    if (DDayChange(timeStamp, lockPeriod) > 15) {
      return <IdBgImage src={IdBgOngoing} alt="NFTOngoing" />;
    } else {
      return <IdBgImage src={IdBgForthComing} alt="NFTForthComing" />;
    }
  };

  function calculateDiscountRate(maxValue: number, price: number) {
    return Math.round(((maxValue - price) / maxValue) * 100); // 소수점 반올림
  }

  return (
    <ContentWrapper>
      <IdPriceWrapper>
        <IdWrapper>
          {SwitchNftIdImage()}
          <IdText>{nftId}.</IdText>
        </IdWrapper>
        <PriceTickerWrapper>
          <StyledText>{numberCutter(price)}</StyledText>
          <StyledText isSmall>TON</StyledText>
        </PriceTickerWrapper>
      </IdPriceWrapper>
      <DiscountedExpiryWrapper displayWidth={window.innerWidth}>
        <StyledText width={3}>
          {calculateDiscountRate(maxValue, price)}%
        </StyledText>
        <StyledText isSmall width={6}>
          {expiredDateChanger(timeStamp, lockPeriod, "detail")}
        </StyledText>
      </DiscountedExpiryWrapper>
    </ContentWrapper>
  );
};

export default PositionItem;

const ContentWrapper = styled.div`
  display: flex;
  padding: 0.8rem 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f7;
`;

const IdWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  position: relative;
  overflow: hidden;
`;

const IdBgImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const IdText = styled.span`
  text-align: center;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
`;

const StyledText = styled.span<{ isSmall?: boolean; width?: number }>`
  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  ${({ isSmall }) => isSmall && "font-size: 1.1rem;"}
  ${({ width }) => width && `width: ${width}rem; text-align: center;`}
`;

const PriceTickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IdPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DiscountedExpiryWrapper = styled.div<{ displayWidth: number }>`
  display: flex;
  align-items: center;
  gap: ${({ displayWidth }) => `${displayWidth * 0.1173}px`};
`;
