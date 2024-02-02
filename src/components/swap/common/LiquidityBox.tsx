import { styled } from "styled-components";
import IcArrowUp from "../../../assets/icons/MyAsset/ic_arrow_up.svg";
import IcArrowDown from "../../../assets/icons/MyAsset/ic_arrow_down.svg";
import IcNxt from "../../../assets/icons/Swap/ic_nxt.svg";
import IcTon from "../../../assets/icons/Swap/ic_ton.svg";

import { useState } from "react";
import LiquiditySubBox from "./LiquiditySubBox";

interface LiquidityBoxProps {
  type?: string;
}

const LiquidityBox = (props: LiquidityBoxProps) => {
  const { type } = props;
  const [isOpenLiquidity, setIsOpenLiquidity] = useState(false);

  return (
    <LiquidityBoxWrapper>
      <LiquidityBoxTop onClick={() => setIsOpenLiquidity((prev) => !prev)}>
        Pool Liquidity
        {type === "liquidity" &&
          (isOpenLiquidity ? (
            <img src={IcArrowUp} alt="arrowDown" />
          ) : (
            <img src={IcArrowDown} alt="arrowUp" />
          ))}
      </LiquidityBoxTop>
      {type === "swap" ? (
        <>
          <LiquidityDescBox>
            <span>TVL</span>
            <span>$ 251.52m</span>
          </LiquidityDescBox>
          <LiquiditySubBox title="Total Tokens Locked" />
          <LiquidityDescBox>
            <span>24h Fee</span>
            <span>$ 79.82K</span>
          </LiquidityDescBox>
        </>
      ) : (
        isOpenLiquidity && (
          <>
            <TotalValueBox>
              <span>Total Value</span>
              <TotalValueTokenBox>
                <TokenNameBox>
                  <img src={IcNxt} alt="nxt" />
                  <span>NXT</span>
                  <span>000,000k</span>
                </TokenNameBox>
                <TokenNameBox>
                  <img src={IcTon} alt="ton" />
                  <span>TON</span>
                  <span>000,000k</span>
                </TokenNameBox>
              </TotalValueTokenBox>
            </TotalValueBox>
            <LiquiditySubBox title="Current Price" />
          </>
        )
      )}
    </LiquidityBoxWrapper>
  );
};

export default LiquidityBox;

const LiquidityBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  margin: 1rem 0;
  padding: 2.4rem 2.6rem;

  border: 0.1rem solid #e1e4e6;
  border-radius: 2rem;
  background-color: #fff;
`;

const LiquidityBoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  cursor: pointer;
`;

const LiquidityDescBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1.9rem;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;

const TotalValueBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  margin-top: 2rem;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;

const TotalValueTokenBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const TokenNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;
