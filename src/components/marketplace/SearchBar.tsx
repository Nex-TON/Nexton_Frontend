import { styled } from "styled-components";
import IcDown from "../../assets/icons/Marketplace/ic_trendDown.svg";
import IcSearch from "../../assets/icons/Marketplace/ic_search.svg";
import IcTonSymbol from "../../assets/icons/MyAsset/ic_tonSymbol.svg";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  onClick: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { searchValue, setSearchValue, onClick } = props;

  function onChange(value: string) {
    let inputValue = value;
    // Remove all commas for processing
    inputValue = inputValue.replace(/,/g, "");

    // 숫자와 소수점만 입력 가능한 정규식 검사
    if (!/^[\d.]*$/.test(inputValue)) return;

    // 소수점은 하나만 허용
    if ((inputValue.match(/\./g) || []).length > 1) return;

    // 숫자는 1,000 단위마다 콤마로 구분
    const parts = inputValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setSearchValue(parts.join("."));
  }

  return (
    <ContentWrapper>
      <UnderLabel>
        <span>Under</span>
        <img src={IcDown} alt="Down Icon" />
      </UnderLabel>
      <BudgetInput
        placeholder="Your budget"
        inputMode="decimal"
        value={searchValue}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <TonSymbol src={IcTonSymbol} alt="TON" />
      <SearchBtn>
        <img src={IcSearch} alt="Search Icon" />
      </SearchBtn>
    </ContentWrapper>
  );
};

export default SearchBar;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  border-radius: 3rem;
  background: var(
    --gardation-pate-3,
    linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%)
  );
`;

const UnderLabel = styled.div`
  display: flex;
  padding: 1rem 1.2rem 1rem 1.4rem;
  align-items: center;
  gap: 0.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    160deg,
    rgba(243, 246, 252, 0.2) 11.73%,
    rgba(230, 231, 247, 0.2) 98.61%
  );

  span {
    color: #fff;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }
  img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const BudgetInput = styled.input`
  flex: 1;
  min-width: 9rem;

  border: none;
  background-color: transparent;
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  outline: none;

  &::placeholder {
    color: #5d5e67;
  }
`;

const TonSymbol = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SearchBtn = styled.div`
  padding: 1rem;
  border-radius: 3rem;
  width: 4.2rem;
  height: 4.2rem;
  background: linear-gradient(
    160deg,
    rgba(243, 246, 252, 0.2) 11.73%,
    rgba(230, 231, 247, 0.2) 98.61%
  );
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
`;
