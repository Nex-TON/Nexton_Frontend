import styled from "styled-components";
import IcNlp from "../../assets/icons/ic_nlp.svg";
import StatusDetail from "../common/StatusDetail";
import Input from "../common/Input";
import Max from "../common/Max";
import IcTon from "../../assets/icons/ic_ton.svg";
import useTonConnect from "../../hooks/useTonConnect";

interface NlpContextProps {
  input: string;
  setInput: (input: string) => void;
}

const NlpContext = (props: NlpContextProps) => {
  const { input, setInput } = props;
  const { balance } = useTonConnect();

  return (
    <NlpContextWrapper>
      <NlpContextHeader>
        <NlpImg src={IcNlp} alt="nlp" />
        <NlpContextTextBox>
          <p>Nexton</p>
          <p>Liquidity Providers</p>
        </NlpContextTextBox>
      </NlpContextHeader>
      <StatusDetail type="NLP" />
      <NlpInputWrapper>
        <Input input={input} setInput={setInput} />
        <RightSection>
          <Max setInput={setInput} />
          <TonImg src={IcTon} alt="ton" />
          <TokenText>TON</TokenText>
        </RightSection>
      </NlpInputWrapper>
      <BalanceBlock>
        <MinimumText>Minimum Amount 10,000 TON</MinimumText>
        <BalanceText>Balance : {balance.toFixed(3)}</BalanceText>
      </BalanceBlock>
    </NlpContextWrapper>
  );
};

export default NlpContext;

const NlpContextWrapper = styled.div`
  width: 95%;
  margin-top: 1.9rem;
  margin-bottom: 15rem;
`;

const NlpContextHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-bottom: 2.2rem;
`;
const NlpImg = styled.img`
  width: 8.8rem;
  height: 8.8rem;
`;

const NlpContextTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  margin-left: 3.6rem;

  p {
    ${({ theme }) => theme.fonts.Telegram_Title_3_1};
    color: #23232a;
  }
`;

const NlpInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 3rem;
  padding: 2rem 1.7rem 2rem 2.3rem;

  border-radius: 1rem;
  background-color: #f2f2f7;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const TokenText = styled.span`
  margin-left: 0.7rem;

  font-family: SF Pro;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.8rem; /* 128.571% */
  letter-spacing: -0.0154rem;
  color: #0b0b0b;
`;

const TonImg = styled.img`
  width: 2.0002rem;
  height: 2rem;
  margin-left: 2rem;
`;

const BalanceBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 1rem;
`;

const MinimumText = styled.span`
  color: #767680;
  ${({ theme }) => theme.fonts.Telegram_Caption_2};
`;
const BalanceText = styled.span`
  color: #3e4064;
  ${({ theme }) => theme.fonts.Telegram_Medium_2};
`;
