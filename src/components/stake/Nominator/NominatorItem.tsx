import { styled } from "styled-components";

import IcBemoPool from "@/assets/icons/Stake/ic_bemo_pool.svg";
import { INominatorList } from "@/hooks/api/useNominatorList";
import { limitDecimals } from "@/utils/limitDecimals";
import hyperliquid from "@/assets/icons/Dashboard/ic_hyperliquid_letter.svg";
import stonfi from "@/assets/icons/Dashboard/ic_stonfi_letter.svg";
import binance from "@/assets/icons/Dashboard/ic_binance_letter.svg";
import binance_small from "@/assets/icons/Main/ic_binance_logo.svg";
import stonfi_small from "@/assets/icons/Main/ic_stonfi_logo.svg";

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

  const icon = title === "Bemo Pool" ? IcBemoPool : null;

  const handleClick = () => {
    handleSelectNominator(id);
  };

  return (
    <NominatorItemWrapper
      id={`${title}`}
      $disabled={disabled}
      $active={isSelected}
      onClick={() => (!disabled ? handleClick() : null)}
    >
      <NominatorItemTop $active={isSelected} $disabled={disabled}>
        <NominatorItemTopLeft>
          <NominatorItemTitle $inactive={disabled} $selected={isSelected}>
            {icon && <img src={icon} alt="icon" />}{" "}
            {title === "Bemo Pool" ? "Bemo pool" : title === "Arbitrage Bot 1" ? "DEX-DEX bot" : "CEX-DEX bot"}
          </NominatorItemTitle>
          {title != "Bemo Pool" ? (
            <NominatorExchange>
              <img style={{ height: "17.43px" }} src={title === "Arbitrage Bot 1" ? hyperliquid : binance} />
              <VerticalLine />
              <img style={{ height: "17.43px" }} src={stonfi} />
            </NominatorExchange>
          ) : (
            <NominatorExchange>
              <p> CEX-DEX bot</p>
              <img src={binance_small} style={{ width: "17.552px", marginRight: "7px" }} />
              <img src={stonfi_small} style={{ width: "17.552px" }} />
            </NominatorExchange>
          )}
        </NominatorItemTopLeft>
        <DivideLine />
      </NominatorItemTop>
      <NominatorItemBottom $active={isSelected} $disabled={disabled}>
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

const DivideLine = styled.div`
  width: 100%;
  padding: 0 2rem;
  height: 1px;
  background: #f1f4f4;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 9.828px;
  background: #f1f4f4;
  margin: 0 11px;
`;

const NominatorExchange = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 7px;
  width: 100%;
  height: auto;
  p {
    color: var(--Neutral-Neutural-20, #303234);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    margin-right: 2.5rem;
  }
`;

const NominatorItemWrapper = styled.div<{ $active: boolean; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;

  /* padding: 2rem 2.4rem; */
  border-radius: 1.5rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.14);
  & + & {
    margin-top: 1rem;
  }

  /* background: ${({ $active, $disabled }) => {
    let background: string;
    if ($active) {
      background = "#1A1B23";
    } else if ($disabled) {
      background = "#E1E4E6";
    } else {
      background = "#fff";
    }

    return background;
  }}; */

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};
`;

const NominatorItemTop = styled.div<{ $active; $disabled }>`
  /* border-bottom: 1px solid #f1f4f4; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 2.6rem;

  width: 100%;
  padding: 1.8rem 2.3rem 0rem 2.3rem;
  border-radius: 1.5rem 1.5rem 0 0;

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

  background: ${({ $active, $disabled }) => {
    let background: string;
    if ($active) {
      background = "#E1E4E6";
    } else if ($disabled) {
      background = "#E1E4E6";
    } else {
      background = "#fff";
    }

    return background;
  }};
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

const NominatorItemBottom = styled.div<{ $active; $disabled }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex: 1;
  gap: 1.7rem;

  width: 100%;
  padding: 1.5rem 2.7rem;
  border-radius: 0 0 15px 15px;

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
  color: #303234;

  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 26px; /* 130% */
  letter-spacing: -0.4px;
`;
