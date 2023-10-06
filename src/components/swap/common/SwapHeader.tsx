import { styled } from "styled-components";

interface SwapHeaderProps {
  isClick: boolean[];
  handleSwitchNav: (idx: number) => void;
}

const SwapHeader = (props: SwapHeaderProps) => {
  const { isClick, handleSwitchNav } = props;

  return (
    <>
      <SwapHeaderBox>
        <SwapHeaderTop>Swap</SwapHeaderTop>
      </SwapHeaderBox>
      <SwapNavBox>
        <SwapButtton click={isClick[0]} onClick={() => handleSwitchNav(0)}>
          Swap
        </SwapButtton>
        <SwapButtton click={isClick[1]} onClick={() => handleSwitchNav(1)}>
          Add Liquidity
        </SwapButtton>
      </SwapNavBox>
    </>
  );
};

export default SwapHeader;

const SwapHeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const SwapHeaderTop = styled.div`
  padding-top: 3rem;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Title_Large};
`;

const SwapNavBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
  margin-top: 3.3rem;
`;

const SwapButtton = styled.button<{ click: boolean }>`
  width: 50%;
  padding: 0.8rem 1rem;

  border: none;
  border-radius: 3rem;
  background-color: ${({ click }) => (click ? "#FFF" : "#f9f9ff")};
  box-shadow: ${({ click }) =>
    click && `0px 4px 4px 0px rgba(225, 228, 230, 0.5)`};
  color: ${({ click }) => (click ? "#007AFF" : "#76797A")};
  ${({ theme }) => theme.fonts.Telegram_Caption_1_1};

  transition: all 0.3s ease-in-out;
  outline: none;
  cursor: pointer;
`;
