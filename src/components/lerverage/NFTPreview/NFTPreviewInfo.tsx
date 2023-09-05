import { css, styled } from "styled-components";
import { StakingProps } from "../../../types/staking";
import { getProtocolFee } from "../../../utils/getProtocolFee";
import { numberCutter } from "../../../utils/numberCutter";

interface NFTPreviewInfoProps {
  stakingInfo: StakingProps;
}

const NFTPreviewInfo = (props: NFTPreviewInfoProps) => {
  const { stakingInfo } = props;

  return (
    <NFTPreviewInfoWrapper>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Principal</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>
          {Number(stakingInfo.principal).toLocaleString()} TON
        </NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Leveraged</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>
          x {stakingInfo.leverage.toFixed(1)}
        </NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Lock-up period</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>
          {stakingInfo.lockup} Days
        </NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Protocol Fees</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText>
          {numberCutter(
            getProtocolFee(stakingInfo.principal, stakingInfo.leverage)
          )}
          %
        </NFTPreviewInfoItemText>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText type="bold">Total</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemText type="bold">
          {stakingInfo.principal} TON
        </NFTPreviewInfoItemText>
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
