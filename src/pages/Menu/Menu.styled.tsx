import { styled } from "styled-components";
import MainMyAssetInfoCard from "@/assets/image/MainMyAssetInfoCard.svg";

export const MainWrapper = styled.div`
  width: 100%;
  padding: 0 0.6rem 1rem 0.6rem;

  background-color: #fff;
`;

export const MainInnerBox = styled.div`
  position: relative;
  height: 222px;
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 2.3rem 2.1rem 2.7rem 2.3rem;
  margin-bottom: 1.2rem;

  border-radius: 3.2rem;
  background: linear-gradient(270deg, #002639 0%, #001b29 28.13%, #000 100%);
  overflow: hidden; /* 자식 요소가 부모 요소를 넘지 않도록 설정 */
  &::before {
    content: "";
    position: absolute;
    top: -82px;
    left: -50px;
    right: -50px;
    bottom: 103px;
    width: 179px;
    height: 179px;
    background: rgba(31, 83, 255, 0.4);
    filter: blur(60px);
    pointer-events: none; /* 클릭 이벤트를 방지 */
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 179px;
    height: 179px;
    background: rgba(152, 255, 126, 0.2);
    filter: blur(60px);
    pointer-events: none; /* 클릭 이벤트를 방지 */
  }
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
  justify-content: center;
  flex: 1;
`;

export const AssetBottomNotConnected = styled.div`
  margin-top: 27px;
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

export const AssetBottomNotConnectedImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 12px;

  img {
    width: 125.065px;
    height: 74.472px;
    flex-shrink: 0;
  }
`;
export const AssetBottomNotConnectedText = styled.div`
  display: flex;
  p {
    color: var(--Neutral-Neutural-80, #c6caca);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
  }
  img {
    width: 24px;
    height: 24px;
  }
`;

export const AssetBottomLeft = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 9px;
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
    color: #fff;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 24px */
    letter-spacing: -0.46px;
  }

  span {
    color: var(--Neutral-variant-Neutral-variant-80, #c6c5d0);
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    letter-spacing: -0.46px;
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
  align-items: center;
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
  flex-direction: row;
  align-items: start;
  gap: 6px;

  border-radius: 0px 20px 20px 20px;
  background: linear-gradient(263deg, #6561ff 1.72%, #2d27ff 95.22%);

  padding: 9px 25px 9px 14px;

  span {
    color: var(--Neutral-Neutural-100, #fff);
    font-family: Montserrat;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 16.5px */
    text-transform: capitalize;
  }

  h4 {
    color: #fff;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 24px */
    letter-spacing: -0.46px;
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
  margin-top: 15px;
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
