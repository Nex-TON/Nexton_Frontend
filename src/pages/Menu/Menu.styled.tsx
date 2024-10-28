import { styled } from "styled-components";


export const MainWrapper = styled.div`
  width: 100%;
  padding: 0 0.6rem 1rem 0.6rem;

  background-color: #fff;
`;

export const MainInnerBox = styled.div`
  position: relative;
  height: 260px;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 2.3rem 2.1rem 2.7rem 2.3rem;
  margin-bottom: 1.2rem;

  border-radius: 3.2rem;
  background: linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%);
`;

export const BackgroundChart = styled.div<{ $isVisible: boolean; $src: string }>`
  position: absolute;
  width: 241px;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none; // Ensures the image doesn't interfere with interactions
  background-image: ${({ $isVisible, $src }) => ($isVisible ? `url(${$src})` : "none")};
  background-size: cover;
  background-position: center;

  border-radius: 0 3.2rem 3.2rem 0;
`;

export const MainTopBox = styled.div<{ $marginBottom: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: ${({ $marginBottom }) => ($marginBottom ? "2.1rem" : "0")};

  color: #c6c5d0;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
`;

export const MainTopLeft = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
`;

export const MainLeftItem = styled.div<{ $isActive?: boolean }>`
  padding: 0.7rem 1.3rem;

  cursor: pointer;

  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#FFFFFF4D")};
  border-bottom: ${({ $isActive }) => ($isActive ? "0.2rem solid #fff" : "0.2rem solid #FFFFFF4D")};
`;

export const MainTopRight = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const AssetBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  margin-bottom: 2rem;
`;

export const AssetBottomNotConnected = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  cursor: pointer;

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Large};
    color: #fff;
    margin-left: 0.7rem;
    margin-right: 1.1rem;
  }
`;

export const AssetBottomLeft = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 2.5rem;
`;

export const AssetBottomLeftItem = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

export const AssetBottomLeftItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
`;

export const AssetBottomRight = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const AssetBottomRightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #c6c5d0;
    text-transform: capitalize;
  }

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
    font-size: 2rem;
    background-image: linear-gradient(134deg, #6bd3ff 7.39%, #3461ff 97.6%);
    color: transparent;
    background-clip: text;
  }
`;

export const AssetBottomLeftItemTitle = styled.h3`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
  color: #c6c5d0;
  text-transform: capitalize;
`;

export const AssetBottomLeftItemValue = styled.div`
  display: flex;
  color: #fff;
  gap: 1rem;

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
    font-size: 2.8rem;
  }

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    align-self: flex-end;
    text-transform: capitalize;
    font-size: 2.4rem;
    font-weight: 500;
  }
`;

export const AssetBottomTitle = styled.div`
  width: 77px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem 1.6rem;

  border-radius: 4rem;
  border: 0.1rem solid #5d5e67;

  color: #c6c5d0;
  ${({ theme }) => theme.fonts.Nexton_Label_Small_2};
`;

export const AssetBottomValue = styled.span`
  color: #fff;
  ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
`;

export const DashboardBottomBox = styled(AssetBottomBox)`
  margin-bottom: 0;
  cursor: pointer;
`;

export const DashboardBottomLeft = styled(AssetBottomLeft)`
  justify-content: start;
  width: 100%;
`;

export const DashboardBottomLeftTitleBox = styled.div`
  display: flex;
  align-items: end;
  gap: 1.8rem;
`;

export const DashboardBottomLeftTitle = styled.h3`
  ${({ theme }) => theme.fonts.Nexton_Title_Large_2};
  color: #fff;
`;

export const APYBox = styled.div`
  width: 130px;
  max-width: 130px;

  display: flex;
  flex-direction: column;
  align-items: start;

  border-radius: 30px 30px 30px 0px;
  border: 1px solid #7796ff;
  background: linear-gradient(262deg, #102e34 10.02%, #142b34 21.92%, #2b1338 101.69%);

  padding: 0.75rem 2.8rem 0.75rem 3.3rem;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Small};
    color: #c6c5d0;
    text-transform: capitalize;
  }

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
    font-size: 2rem;
    background: linear-gradient(95deg, #3491ff 6.73%, #e0e7ff 41.98%, #3491ff 85.62%);
    color: transparent;
    background-clip: text;
  }
`;

export const DashboardBottomLeftData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2rem;
`;

export const DashboardBottomLeftDataItem = styled(AssetBottomRightItem)`
  align-items: start;
  text-transform: capitalize;

  h4 {
    ${({ theme }) => theme.fonts.Nexton_Title_Large_Small};
    font-size: 1.6rem;
    color: #fff;
  }
`;

export const DashboardBottomRight = styled(AssetBottomRight)`
  width: 15%;
  position: absolute;
  right: 0;
  bottom: 0;

  z-index: 10;
  border-radius: 0 3.2rem 3.2rem 0;

  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
