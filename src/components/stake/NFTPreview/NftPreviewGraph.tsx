import { styled } from "styled-components";
import { StakingProps } from "../../../types/staking";
import DefaultGraph from "../../../assets/icons/Stake/StakePreviewGraphDefault.svg";
import LeveragedGraph from "../../../assets/icons/Stake/StakePreviewGraphLeveraged.svg";
import TonSymbol from "../../../assets/icons/ic_ton.svg";

interface NftPreviewGraphProps {
  stakingInfo: StakingProps;
}

const NftPreviewGraph = (props: NftPreviewGraphProps) => {
  const { stakingInfo } = props;
  console.log(`leverage: ${stakingInfo.leverage}`);

  return (
    <ContentWrapper>
      <GraphWrapper
        image={stakingInfo.leverage > 1 ? LeveragedGraph : DefaultGraph}
      >
        <Column style={{ flex: 238 }}>
          <Column style={{ flex: 4 }}>
            <RewardWrapper>
              <span>Rewards</span>
            </RewardWrapper>
            <FinalLabel>
              <span>Final</span>
              <span>3,105.34</span>
              <img src={TonSymbol} style={{ width: "2rem", height: "2rem" }} />
            </FinalLabel>
          </Column>
          <Column style={{ flex: 3 }}>
            {stakingInfo.leverage > 1 && (
              <>
                <span />
                <OriginalLabel>
                  <span>Original</span>
                  <span>1,220</span>
                  <img
                    src={TonSymbol}
                    style={{ width: "1.2rem", height: "1.2rem" }}
                  />
                </OriginalLabel>
              </>
            )}
          </Column>
          <Column style={{ flex: 3 }}></Column>
        </Column>
        <Column style={{ flex: 97 }}></Column>
      </GraphWrapper>
      <GraphBottomWrapper>
        <div>
          <span>Principal</span>
          <span>{stakingInfo.principal} TON</span>
        </div>
        <div></div>
      </GraphBottomWrapper>
      <GraphLabelWrapper>
        <div>
          <span>Today</span>
          <span>End date</span>
        </div>
        <div>
          <span />
          <span>After</span>
        </div>
      </GraphLabelWrapper>
    </ContentWrapper>
  );
};

export default NftPreviewGraph;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;

  span {
    color: #767680;
    ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
  }
`;

const GraphWrapper = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: 100%;
  display: flex;
  width: 100%;
  aspect-ratio: 335/210;
  border-radius: 2rem 2rem 0 0;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const FinalLabel = styled.div`
  display: inline-flex;
  padding: 0.8rem 1.6rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 2rem 2rem 0 2rem;
  background: linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%);

  span {
    &:nth-child(1) {
      color: #c6c5d0;
    }
    &:nth-child(2) {
      color: #fff;
      ${({ theme }) => theme.fonts.Nexton_Title_Small};
    }
  }
`;

const OriginalLabel = styled.div`
  display: inline-flex;
  padding: 0.6rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  border-radius: 1.5rem 1.5rem 0 1.5rem;
  background: rgba(255, 255, 255, 0.6);
`;

const RewardWrapper = styled.div`
  position: relative;
  width: 100%;
  span {
    position: absolute;
    top: 1.4rem;
    left: 1.4rem;
  }
`;

const GraphBottomWrapper = styled.div`
  width: 100%;
  display: flex;
  div {
    width: 100%;
    display: flex;
    &:nth-child(1) {
      flex: 238 1 0;
      align-items: center;
      justify-content: space-between;
      border-radius: 0 0 0 2rem;
      background: linear-gradient(
        270deg,
        #002639 0%,
        #001b29 28.13%,
        #000 100%
      );
      span {
        padding: 0.6rem 1.2rem;
        color: #f2f2f7;
      }
    }
    &:nth-child(2) {
      flex: 97 1 0;
      border-radius: 0 0 2rem 0;
      background-color: #f2f2f7;
    }
  }
`;

const GraphLabelWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0.6rem 1.15rem 0 1.15rem;
  div {
    display: flex;
    justify-content: space-between;
    &:nth-child(1) {
      flex: 229;
    }
    &:nth-child(2) {
      flex: 78;
    }
    span {
      color: #333;
    }
  }
`;
