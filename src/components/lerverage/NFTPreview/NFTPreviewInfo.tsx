import { css, styled } from "styled-components";

const NFTPreviewInfo = () => {
  return (
    <NFTPreviewInfoWrapper>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Principal</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>40,000 TON</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Transaction Fee</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>40,000 TON</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Leveraged</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>x 2.5</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Lock-up period</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>150 Days</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Protocol Fees</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>9.2%</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText type="bold">Total</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText type="bold">40,000 TON</NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
    </NFTPreviewInfoWrapper>
  );
};

export default NFTPreviewInfo;

const NFTPreviewInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: 100%;
  margin: 4rem 0 5.5rem 0;
  padding: 0 2rem;
`;

const NFTPreviewInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const NFTPreviewInfoItemText = styled.span<{ type?: string }>`
  color: #000;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  ${({ type }) =>
    type === "bold" &&
    css`
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    `}
`;
