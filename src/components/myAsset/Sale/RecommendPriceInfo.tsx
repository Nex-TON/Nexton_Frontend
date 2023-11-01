import styled from "styled-components";

interface RecommendPriceInfoProps {
  principal: number;
}

const RecommendPriceInfo = (props: RecommendPriceInfoProps) => {
  const { principal } = props;

  return (
    <ContentWrapper>
      <TitleLabelText>Recommend Price Range</TitleLabelText>
      <PricesWrapper>
        <PriceItem>
          <PriceLabel>Min. (90% Principal)</PriceLabel>
          <PriceValue>
            <span>{principal * 0.9}</span>
            <span>TON</span>
          </PriceValue>
        </PriceItem>
        <PriceItem>
          <PriceLabel>Max.</PriceLabel>
          <PriceValue>
            <span>0.000</span>
            <span>TON</span>
          </PriceValue>
        </PriceItem>
      </PricesWrapper>
    </ContentWrapper>
  );
};

export default RecommendPriceInfo;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.4rem;
`;

const TitleLabelText = styled.span`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
`;

const PricesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const PriceItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 1.2rem;
  border-radius: 2rem;
  border: 1px solid #e5e5ea;
`;

const PriceLabel = styled.div`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: #5d5e67;
`;

const PriceValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  span {
    color: #5d5e67;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
  }
  :last-child {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
`;
