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
  gap: 1.6rem;

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

export const ChartHeaderSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  h5 {
    color: #76797a;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
  }

  span {
    color: #007aff;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const PerformanceWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  h2 {
    color: #2c3542;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }

  h3 {
    color: #76797a;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const PerformanceItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.15);

  padding: 2.4rem;
  margin-top: 1rem;
`;

export const PerformanceItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Title_Small};
  }
`;

export const PerformanceItemHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PerformanceItemHeaderRight = styled.div`
  display: flex;
  align-items: center;

  color: #303234;
  ${({ theme }) => theme.fonts.Nexton_Title_Medium};
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #f1f4f4;
  margin: 0;
  height: 1px;
  width: 100%;
`;

export const PerformanceItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PerformanceItemBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h4 {
    color: #909394;
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  }

  p {
    color: #303234;
    ${({ theme }) => theme.fonts.Nexton_Label_Medium};
`;

export const PerformanceItemFooter = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1.6rem;
`;

export const StakeButton = styled.button`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  background: #1f53ff;
  color: #fff;
  border: none;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};

  cursor: pointer;

  padding: 1rem;
  gap: 4px;
`;
