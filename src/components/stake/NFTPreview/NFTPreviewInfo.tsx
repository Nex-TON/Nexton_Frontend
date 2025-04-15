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
        <NFTPreviewInfoItemValue>
          <span>{Number(stakingInfo.principal).toLocaleString()}</span> {stakingInfo.tokenSort}
        </NFTPreviewInfoItemValue>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Transaction Fee</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemValue>
          <span>~0.1123</span> {"TON"}
        </NFTPreviewInfoItemValue>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Leveraged</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemValue>
          x <span>{stakingInfo.leverage.toFixed(1)}</span>
        </NFTPreviewInfoItemValue>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Lock-up period</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemValue>
          <span>{stakingInfo.lockup}</span> days remaining
        </NFTPreviewInfoItemValue>
      </NFTPreviewInfoItem>
      <NFTPreviewInfoItem>
        <NFTPreviewInfoItemText>Protocol Fees</NFTPreviewInfoItemText>
        <NFTPreviewInfoItemValue>
          <span>~{numberCutter(getProtocolFee(stakingInfo.principal, stakingInfo.leverage))}</span>%
        </NFTPreviewInfoItemValue>
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

  width: 100%;
  margin: 1rem 0 5.5rem 0;
  padding: 0 2.8rem;
`;

const NFTPreviewInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0.6rem;

  border-bottom: 0.1rem solid #e5e5ea;
`;

const NFTPreviewInfoItemText = styled.span<{ type?: string }>`
  color: #76797a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  ${({ type }) =>
    type === "bold" &&
    css`
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    `}
`;

const NFTPreviewInfoItemValue = styled.div`
  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large}
  }
`;
