import { styled } from "styled-components";
import LiquiditySubBox from "./LiquiditySubBox";

const LiquidityBox = () => {
  return (
    <LiquidityBoxWrapper>
      <LiquidityBoxTop>Pool Liquidity</LiquidityBoxTop>
      <LiquidityDescBox>
        <span>TVL</span>
        <span>$ 251.52m</span>
      </LiquidityDescBox>
      <LiquiditySubBox />
      <LiquidityDescBox>
        <span>24h Fee</span>
        <span>$ 79.82K</span>
      </LiquidityDescBox>
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

  border-radius: 2rem;
  background-color: #f9f9ff;
`;

const LiquidityBoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
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
