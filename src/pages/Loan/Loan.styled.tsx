import { styled } from "styled-components";

export const LoanWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 2.5rem 1.5rem;
`;

export const LoanHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const LoanHeaderBoxTitle = styled.div`
  display: flex;
  text-transform: capitalize;

  h1 {
    color: #0f0f0f;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 34px;
  }
`;

export const LoanHeaderBoxButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  padding: 1.2rem;

  border-radius: 1.8rem;
  cursor: pointer;
`;

export const LoanSwitcherBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1.7rem;
`;

export const LoanSwitcherBoxItem = styled.div<{ $isActive?: boolean }>`
  text-transform: capitalize;
  padding: 0.7rem 1.3rem;

  cursor: pointer;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  color: ${({ $isActive }) => ($isActive ? "#303234" : "#C6CACA")};
  border-bottom: ${({ $isActive }) => ($isActive ? "0.2rem solid #303234" : "0.2rem solid #C6CACA")};
`;

export const LoanSwitcherBoxTooltip = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 70%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoanNFTBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2.4rem;
`;

export const LoanNFTBoxHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoanNFTBoxHeaderLeft = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #76797a;
  }

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    font-weight: 600;
    color: #303234;
  }
`;

export const LoanNFTBoxHeaderRight = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #76797a;
  }
`;