import { styled } from "styled-components";

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DashboardWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  padding: 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: #46494a;
    ${({ theme }) => theme.fonts.Nexton_Title_Medium};
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;
`;

export const ChartHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  justify-content: center;
  align-items: start;

  margin-top: 1.8rem;
`;

export const ChartHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h4 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const ChartHeaderSubtitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 3.2rem;

  margin-top: 1.8rem;
`;

export const ChartHeaderSubtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;

  h5 {
    color: #76797a;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }

  span {
    color: #007aff;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 157.143% */
  }
`;

export const ChartHeaderDivider = styled.div`
  width: 1px;
  height: 34px;

  background: #f1f4f4;
`;

export const ChartTimeFrame = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  margin-top: 1.6rem;
`;

export const ChartTimeFrameItem = styled.div<{ $active?: boolean }>`
  width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;

  cursor: pointer;

  border-radius: 30px;
  background: ${({ $active }) => ($active ? "#E1E4E6" : "transparent")};

  color: #000000;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
`;

export const PerformanceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 4.3rem;

  h2 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const PerformanceItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

export const PerformanceItem = styled.div<{ $fullWidth?: boolean }>`
  height: 100px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "50%")};

  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);

  padding: 2.2rem;

  h3 {
    color: #76797a;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }

  p {
    color: #46494a;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 21px */
  }
`;

export const TonPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  margin-top: 4.6rem;

  h2 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const TonPriceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 2.4rem;
  margin-top: 1rem;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(206, 216, 225, 0.5);
`;

export const TonPriceItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large_2};
  }
`;

export const TonPriceItemRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  }
`;

export const TonPriceItemRightPercentage = styled.div<{ $positive?: boolean }>`
  color: ${({ $positive }) => ($positive ? "#34C759" : "#FF7979")};
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
`;
