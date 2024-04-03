import { styled } from "styled-components";

import IcNXT from "../../../assets/icons/Swap/ic_nxt.svg";
import IcTon from "../../../assets/icons/Swap/ic_ton.svg";

const LiquidityPair = () => {
  return (
    <LiquidityPairWrapper>
      <LiquidityPairTokenBox>
        <img src={IcNXT} alt="nxt" style={{ marginRight: "0.6rem" }} />
        NXT
      </LiquidityPairTokenBox>
      <LiquiditySlash />
      <LiquidityPairTokenBox>
        <img src={IcTon} alt="ton" style={{ marginRight: "0.6rem" }} />
        TON
      </LiquidityPairTokenBox>
    </LiquidityPairWrapper>
  );
};

export default LiquidityPair;

const LiquidityPairWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4rem;
  margin-bottom: 1.4rem;
  padding: 0.8rem 0;

  border: 0.1rem solid #e1e4e6;
  border-radius: 2rem;
  background-color: #fff;
`;

const LiquidityPairTokenBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: #09090a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const LiquiditySlash = styled.div`
  width: 0.2rem;
  height: 100%;

  border-radius: 1rem;
  background-color: #e5e5ea;
`;
