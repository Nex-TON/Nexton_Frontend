import { styled } from "styled-components";

const SwapRatio = () => {
  return <SwapRatioWrapper>1 TON = 0.0058NXT ($1.000)</SwapRatioWrapper>;
};

export default SwapRatio;

const SwapRatioWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 2.5rem;

  border: 0.1rem solid #e5e5ea;
  border-radius: 2rem;
  background-color: #fff;

  color: #46494a;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
