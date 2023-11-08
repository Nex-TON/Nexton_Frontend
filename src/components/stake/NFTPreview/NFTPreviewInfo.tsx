import { css, styled } from "styled-components";
import { StakingProps } from "../../../types/staking";
import { getProtocolFee } from "../../../utils/getProtocolFee";
import { numberCutter } from "../../../utils/numberCutter";
import YourNftImage from "../../../assets/image/NftPreview.png";
import TonSymbol from "../../../assets/icons/ic_ton.svg";
import { lockUpDateChanger } from "../../../utils/dateChanger";

interface NFTPreviewInfoProps {
  stakingInfo: StakingProps;
}

const NFTPreviewInfo = (props: NFTPreviewInfoProps) => {
  const { stakingInfo } = props;

  return (
    <NFTPreviewInfoWrapper>
      <RadiusCap />
      <HeaderWrapper>
        <ValueText type="large">Your NFT</ValueText>
        <LabelText>
          Please confirm the information that will be written to the NFT
        </LabelText>
      </HeaderWrapper>
      <ContentWrapper>
        <ContentRowWrapper>
          <NftImage src={YourNftImage} />
          <ContentColumnWrapper isBetween>
            <TextWrapper>
              <LabelText>NFT ID</LabelText>
              <ValueText type="small">{stakingInfo.id}</ValueText>
            </TextWrapper>
            <TextWrapper>
              <LabelText>Expired date</LabelText>
              <ValueText type="small">
                {lockUpDateChanger(stakingInfo.lockup, "detail")}
              </ValueText>
            </TextWrapper>
          </ContentColumnWrapper>
        </ContentRowWrapper>
        <ContentRowWrapper>
          <ContentColumnWrapper isBetween style={{ padding: "2.2rem 1.4rem" }}>
            <LabelText>Principal</LabelText>
            <IconWrapper>
              <ValueText>
                {Number(stakingInfo.principal).toLocaleString()}
              </ValueText>
              <TonIcon src={TonSymbol} />
            </IconWrapper>
          </ContentColumnWrapper>
        </ContentRowWrapper>
        <ContentRowWrapper>
          <ContentColumnWrapper style={{ flex: 64 }}>
            <LabelText>Lock - up Period</LabelText>
            <IconWrapper>
              <ValueText>{stakingInfo.lockup}</ValueText>
              <LabelText>Days</LabelText>
            </IconWrapper>
          </ContentColumnWrapper>
          <ContentColumnWrapper style={{ flex: 36 }}>
            <LabelText>Leveraged</LabelText>
            <ValueText>x {stakingInfo.leverage}</ValueText>
          </ContentColumnWrapper>
        </ContentRowWrapper>
        <ContentRowWrapper>
          <ContentColumnWrapper>
            <LabelText>Transaction Fee</LabelText>
            <IconWrapper>
              <ValueText>0.1123</ValueText>
              <TonIcon src={TonSymbol} />
            </IconWrapper>
          </ContentColumnWrapper>
          <ContentColumnWrapper>
            <LabelText>Protocol Fees</LabelText>
            <ValueText>
              {numberCutter(
                getProtocolFee(stakingInfo.principal, stakingInfo.leverage)
              )}{" "}
              %
            </ValueText>
          </ContentColumnWrapper>
        </ContentRowWrapper>
      </ContentWrapper>
    </NFTPreviewInfoWrapper>
  );
};

export default NFTPreviewInfo;

const NFTPreviewInfoWrapper = styled.div`
  width: 100%;
  background: var(
    --gardation-pate-3,
    linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%)
  );
`;

const RadiusCap = styled.div`
  width: 100%;
  height: 3.6rem;
  border-radius: 0 0 2rem 2rem;
  background-color: #fff;
`;

const HeaderWrapper = styled.div`
  display: inline-flex;
  padding: 2.6rem 2rem 3.6rem 2rem;
  justify-content: center;
  align-items: center;
  gap: 4.8rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 4rem 4rem 4rem;
  @media screen and (max-width: 330px) {
    padding: 0 3rem 4rem 3rem;
  }
`;

const ContentRowWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContentColumnWrapper = styled.div<{ isBetween?: boolean }>`
  width: 100%;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.4rem;
  display: flex;

  ${({ isBetween }) =>
    isBetween
      ? "justify-content: space-between; align-items: center;"
      : "flex-direction: column;"}
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const NftImage = styled.img`
  width: 7.4rem;
  height: 7.4rem;
`;

const TonIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

const ValueText = styled.span<{ type?: string }>`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium_1};
  white-space: nowrap;

  ${({ type }) =>
    type === "large" &&
    css`
      ${({ theme }) => theme.fonts.Nexton_Title_Medium};
    `}

  ${({ type }) =>
    type === "small" &&
    css`
      ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    `}
`;

const LabelText = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;
