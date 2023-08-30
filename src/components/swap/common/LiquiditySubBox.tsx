import { styled } from "styled-components";
import IcTon from "../../../assets/icons/Swap/ic_ton.svg";
import IcNxt from "../../../assets/icons/Swap/ic_nxt.svg";

const LiquiditySubBox = () => {
  return (
    <LiquiditySubBoxWrapper>
      <LiquiditySubBoxTop>Total Tokens Locked</LiquiditySubBoxTop>
      <LiquidityTokenBox>
        <LiquidityTokenSubBox>
          <img src={IcTon} alt="ton" />
          <span>TON</span>
          <span>000,000k</span>
        </LiquidityTokenSubBox>
        <LiquidityTokenSubBox>
          <img src={IcNxt} alt="nxt" />
          <span>NXT</span>
          <span>000,000k</span>
        </LiquidityTokenSubBox>
      </LiquidityTokenBox>
    </LiquiditySubBoxWrapper>
  );
};

export default LiquiditySubBox;

const LiquiditySubBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  margin-top: 2rem;
`;

const LiquiditySubBoxTop = styled.div`
  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;

const LiquidityTokenBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;

  width: 100%;
  margin-top: 1rem;
  padding: 1rem 1.8rem;

  border-radius: 3rem;
  background-color: #f2f2f7;
`;

const LiquidityTokenSubBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;
