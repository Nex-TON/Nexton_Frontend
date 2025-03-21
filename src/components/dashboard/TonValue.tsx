import styled from "styled-components";
import IcTonLogo from "@/assets/icons/Dashboard/ic_ton_logo.svg";
import { useCoinPrice } from "@/hooks/api/useCoinPrice";
import Loader from "@/components/common/Loader";
import IcNxTONLogo from "@/assets/icons/Dashboard/ic_nxTON_logo.svg";

const TonValue = () => {
  const { data: tonPriceData, isLoading: tonPriceLoading, error: tonPriceError } = useCoinPrice("ton", "usd");
  if (tonPriceLoading) {
    return (
      <LoaderWrapper>
        <Loader height={50} width={50} />
      </LoaderWrapper>
    );
  }
  return (
    !tonPriceError && (
      <TonPriceWrapper>
        <TonPriceItem>
          <TonPriceItemLeft>
            <img src={IcTonLogo} alt="ton_logo" />
            <p>TON</p>
            <DivideLine />
          </TonPriceItemLeft>
          <TonPriceItemRight>
            <p>${tonPriceData?.rates?.TON?.prices?.USD.toFixed(2)}</p>
            <TonPriceItemRightPercentage $positive={tonPriceData?.rates?.TON?.diff_24h?.USD[0] == "+" ? true : false}>
              {tonPriceData?.rates?.TON?.diff_24h?.USD}
            </TonPriceItemRightPercentage>
          </TonPriceItemRight>
        </TonPriceItem>
        <TonPriceItem>
          <TonPriceItemLeft>
            <img src={IcNxTONLogo} alt="ton_logo" />
            <p>NxTON</p>
            <DivideLine />
          </TonPriceItemLeft>
          <TonPriceItemRight>
            <p>${tonPriceData?.rates?.TON?.prices?.USD.toFixed(2)}</p>
            <TonPriceItemRightPercentage $positive={tonPriceData?.rates?.TON?.diff_24h?.USD[0] == "+" ? true : false}>
              {tonPriceData?.rates?.TON?.diff_24h?.USD}
            </TonPriceItemRightPercentage>
          </TonPriceItemRight>
        </TonPriceItem>
      </TonPriceWrapper>
    )
  );
};
export default TonValue;

const DivideLine = styled.div`
  width: 1px;
  height: 29px;

  background: #f1f4f4;
  margin-left: 1.8rem;
`;

const TonPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  h2 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

const TonPriceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 2.4rem;
  margin-top: 1rem;

  border-radius: 15px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);
`;

const TonPriceItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 43px;
    height: 43px;
  }

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  }
`;

const TonPriceItemRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;

const TonPriceItemRightPercentage = styled.div<{ $positive?: boolean }>`
  color: ${({ $positive }) => ($positive ? "#34C759" : "#FF7979")};
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
