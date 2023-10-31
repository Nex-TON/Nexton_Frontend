import { styled } from "styled-components";
import TagIcon from "../../../assets/icons/MyAsset/ic_tag.svg";
import IcTonSymbol from "../../../assets/icons/MyAsset/ic_tonSymbol.svg";

interface ListingPriceInputProps {
  input: string;
  setInput: (input: string) => void;
}

const ListingPriceInput = (props: ListingPriceInputProps) => {
  const { input, setInput } = props;
  return (
    <ContetnWrapper>
      <LabelWrapper>
        <img src={TagIcon} alt="TagIcon" />
        <LabelText>Listing Price</LabelText>
      </LabelWrapper>
      <InputWrapper>
        <StyledInput
          inputMode="decimal"
          placeholder="0.000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <UnitLabel>
          <TonIcon src={IcTonSymbol} alt="TonSymbol" />
          <UnitText>TON</UnitText>
        </UnitLabel>
      </InputWrapper>
    </ContetnWrapper>
  );
};

export default ListingPriceInput;

const ContetnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.4rem;
  width: 100%;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const LabelText = styled.span`
  color: #5d5e67;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.8rem 2.6rem;
  border-radius: 20px;
  background: #f2f2f7;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;

  width: 100%;
  background-color: transparent;
  ${({ theme }) => theme.fonts.Telegram_Title_3_1};
  color: #45464f;

  &::placeholder {
    color: #e5e5ea;
  }
`;

const UnitLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TonIcon = styled.img`
  width: 2.6rem;
  height: 2.6rem;
`;

const UnitText = styled.span`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: #333;
  margin: 0.4rem;
`;
