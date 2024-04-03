import { styled } from "styled-components";

import IcNxt from "../../../assets/icons/Swap/ic_nxt.svg";
import IcTon from "../../../assets/icons/Swap/ic_ton.svg";
import { numberCutter } from "../../../utils/numberCutter";

interface SwapBoxProps {
  type: string;
  text?: string;
  select?: string;
  balance?: number;
}

const SwapBox = (props: SwapBoxProps) => {
  const { type, text, select, balance } = props;

  return (
    <SwapBoxWrapper>
      {select === "swap" && (
        <SwapBoxTop>
          <SwapFromText style={{ marginRight: "1rem" }}>{text}</SwapFromText>
          <SwapCaption2>$8.86</SwapCaption2>
        </SwapBoxTop>
      )}
      <SwapMiddleBox>
        <SwapInput placeholder="0.00" type="number" />
        {type === "top" ? (
          <SwapTokenBox>
            <img src={IcNxt} alt="nxt" />
            NXT
          </SwapTokenBox>
        ) : (
          <SwapTokenBox>
            <img src={IcTon} alt="ton" />
            TON
          </SwapTokenBox>
        )}
      </SwapMiddleBox>
      <BalanceBox>
        <span>Balance</span>
        <span>{balance ? `${numberCutter(balance)}` : "0.000"}</span>
      </BalanceBox>
    </SwapBoxWrapper>
  );
};

export default SwapBox;

const SwapBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  padding: 2.2rem 2.5rem;

  border: 0.1rem solid #e1e4e6;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0px 4px 6px 0px rgba(225, 228, 230, 0.5);

  & + & {
    margin-top: 1rem;
  }
`;

const SwapBoxTop = styled.div`
  display: flex;
  align-items: center;

  padding-left: 1.2rem;

  text-align: left;
`;

const SwapFromText = styled.span`
  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;
const SwapCaption2 = styled.span`
  color: #46494a;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
`;

const SwapMiddleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  width: 100%;
  margin: 1rem 0;
`;

const SwapInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.4rem;

  border: none;
  border-radius: 4rem;
  background-color: #f9f9ff;
  color: #1a1b23;
  ${({ theme }) => theme.fonts.Nexton_Title_Large};

  outline: none;

  &::placeholder {
    color: #e5e5ea;
  }
`;

const SwapTokenBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  height: 3.2rem;
  padding: 0.5rem 1rem;

  border: 0.1rem solid #f2f2f7;
  border-radius: 2rem;
  background-color: #fff;
  color: #09090a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const BalanceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 1.2rem;

  span {
    color: #46494a;
    ${({ theme }) => theme.fonts.Telegram_Caption_2};
  }
`;
