import { styled } from "styled-components";

import IcArbitrageBot from "@/assets/icons/Stake/ic_arbitrage_bot.svg";
import IcArbitrageBotLight from "@/assets/icons/Stake/ic_arbitrage_bot_light.svg";
import IcBemoPool from "@/assets/icons/Stake/ic_bemo_pool.svg";
import { INominatorList } from "@/hooks/api/useNominatorList";
import { limitDecimals } from "@/utils/limitDecimals";

export type PoolType = "bemo" | "arbitrage" | "nominator";

interface NominatorItemProps {
  id: number;
  title: string;
  apy: number;
  profitShare: number;
  tvl: number;
  disabled?: boolean;
  selectedNominator: INominatorList;
  handleSelectNominator: (index: number) => void;
}

const NominatorItem: React.FC<NominatorItemProps> = ({
  id,
  title,
  apy,
  profitShare,
  tvl,
  disabled,
  selectedNominator,
  handleSelectNominator,
}) => {
  const isSelected = selectedNominator?.id === id;

  // * temp hardcoded
  const tag = title === "Arbitrage Bot" ? "+ NXT Points" : null;
  const icon =
    title === "Bemo pool"
      ? IcBemoPool
      : title === "Arbitrage Bot"
        ? isSelected
          ? IcArbitrageBotLight
          : IcArbitrageBot
        : null;

  const handleClick = () => {
    handleSelectNominator(id);
  };

  return (
    <NominatorItemWrapper id={`${title}`} $disabled={disabled} $active={isSelected} onClick={() => (!disabled ? handleClick() : null)}>
      <NominatorItemTop>
        <NominatorItemTopLeft>
          <NominatorItemTitle $inactive={disabled} $selected={isSelected}>
            {icon && <img src={icon} alt="icon" />} {title}
          </NominatorItemTitle>
        </NominatorItemTopLeft>

        <NominatorItemTopRight>
          {tag && (
            <NominatorItemTopTag $active={isSelected}>
              <p>{tag}</p>
            </NominatorItemTopTag>
          )}
        </NominatorItemTopRight>
      </NominatorItemTop>

      <NominatorItemBottom>
        {!disabled ? (
          <>
            <NominatorItemBottomItem $selected={isSelected}>
              <h4>APY</h4>
              <p>
                {apy?.toFixed(2)}
                <span> %</span>
              </p>
            </NominatorItemBottomItem>

            <NominatorItemBottomItem $selected={isSelected}>
              <h4>TVL</h4>
              <p>
                {limitDecimals(tvl, 3)}
                <span> TON</span>
              </p>
            </NominatorItemBottomItem>

            <NominatorItemBottomItem $selected={isSelected}>
              <h4>Profit Share</h4>
              <p>
                {profitShare?.toFixed(2)}
                <span> %</span>
              </p>
            </NominatorItemBottomItem>
          </>
        ) : (
          <NominatorComingSoon>Coming Soon</NominatorComingSoon>
        )}
      </NominatorItemBottom>
    </NominatorItemWrapper>
  );
};

export default NominatorItem;

const NominatorItemWrapper = styled.div<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  padding: 2rem 2.4rem;
  border-radius: 1.5rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.14);
  & + & {
    margin-top: 1rem;
  }

  background: ${({ $active, $disabled }) => {
    let background: string;
    if ($active) {
      background = "#1A1B23";
    } else if ($disabled) {
      background = "#E1E4E6";
    } else {
      background = "#fff";
    }

    return background;
  }};
  color: ${({ $disabled, $active }) => {
    let color: string;
    if ($active) {
      color = "#fff";
    } else if ($disabled) {
      color = "#B9B9BA";
    } else {
      color = "#303234";
    }

    return color;
  }};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};
`;

const NominatorItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.6rem;

  width: 100%;

  border-radius: 2rem 2rem 0 0;
`;

const NominatorItemTopTag = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1.15rem;

  border-radius: 4rem;
  background: linear-gradient(90deg, #8468bf -1.21%, #6060ff 100%);

  p {
    text-align: center;
    color: #fff;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 183.333% */
  }
`;

const NominatorItemTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const NominatorItemTopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 1rem;
`;

const NominatorComingSoon = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex: 1;

  color: #b9b9ba;
  font-family: Montserrat;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
`;

const NominatorItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex: 1;
  gap: 1.7rem;

  width: 100%;
  margin-top: 2.3rem;
`;

const NominatorItemBottomItem = styled.div<{ $selected?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    color: var(--Neutral-variant-Neutral-variant-80, #c6c5d0);
    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
  }

  p {
    color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.46px;

    gap: 0.3rem;

    span {
      color: ${({ $selected }) => ($selected ? "#fff" : "#303234")};
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 137.5% */
      letter-spacing: -0.46px;
    }
  }
`;

const NominatorItemTitle = styled.h1<{ $inactive?: boolean; $selected?: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.7rem;

  color: ${({ $inactive, $selected }) => {
    let color: string;
    if ($inactive) {
      color = "#B9B9BA";
    } else if ($selected) {
      color = "#fff";
    } else {
      color = "#303234";
    }

    return color;
  }};

  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 130% */
  letter-spacing: -0.4px;
`;
