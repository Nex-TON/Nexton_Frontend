import { styled } from "styled-components";

import IcNxt from "../../../assets/icons/Swap/ic_nxt.svg";
import IcTon from "../../../assets/icons/Swap/ic_ton.svg";

interface LiquiditySubBoxProps {
  title: string;
}
const LiquiditySubBox = (props: LiquiditySubBoxProps) => {
  const { title } = props;

  return (
    <LiquiditySubBoxWrapper>
      <LiquiditySubBoxTop>{title}</LiquiditySubBoxTop>
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
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: 100%;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
  }
`;
