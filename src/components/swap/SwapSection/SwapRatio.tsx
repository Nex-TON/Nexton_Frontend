import { styled } from "styled-components";
import IcArrowDown from "../../../assets/icons/MyAsset/ic_arrow_down.svg";
import IcArrowUp from "../../../assets/icons/MyAsset/ic_arrow_up.svg";
import { useState } from "react";

const SLIPPAGE = `Minimum received after 
slippage (5.00%)`;

const SwapRatio = () => {
  const [isOpenRatio, setIsOpenRatio] = useState(false);

  return (
    <SwapRatioWrapper>
      <SwapRatioTop onClick={() => setIsOpenRatio((prev) => !prev)}>
        1 TON = 0.0058NXT ($1.000)
        {isOpenRatio ? (
          <img src={IcArrowUp} alt="arrowUp" />
        ) : (
          <img src={IcArrowDown} alt="arrowDown" />
        )}
      </SwapRatioTop>
      {isOpenRatio && (
        <SwapRatioDescWrapper>
          <SwapRatioDescBox>
            <span>Expected Output</span>
            <span>8.84512 TON</span>
          </SwapRatioDescBox>
          <SwapRatioDescBox>
            <span>Price Impact</span>
            <span>0.08 %</span>
          </SwapRatioDescBox>
          <SwapRatioBorder />
          <SwapRatioDescBox>
            <span>{SLIPPAGE}</span>
            <span>8.84512 NXT</span>
          </SwapRatioDescBox>
          <SwapRatioDescBox>
            <span>Network Fee</span>
            <span>Max %</span>
          </SwapRatioDescBox>
        </SwapRatioDescWrapper>
      )}
    </SwapRatioWrapper>
  );
};

export default SwapRatio;

const SwapRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 2.5rem;

  border: 0.1rem solid #e5e5ea;
  border-radius: 2rem;
  background-color: #fff;
`;

const SwapRatioTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  cursor: pointer;
`;

const SwapRatioDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  width: 100%;
  margin-top: 2.4rem;
`;
const SwapRatioDescBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  span {
    color: #5d5e67;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};

    white-space: pre-wrap;
  }
`;

const SwapRatioBorder = styled.div`
  width: 100%;

  border: 0.1rem solid #e5e5ea;
`;
