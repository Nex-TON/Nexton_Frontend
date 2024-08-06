import { useState } from "react";
import { styled } from "styled-components";

import IcTonLogo from "@/assets/icons/Loan/ic_ton_logo.svg";

import { DoubleArrows } from "./DoubleArrows";

type Theme = "black" | "white";

interface StakingInfoProps {
  isExpandable: boolean;
  theme: Theme;
  title: string;
  stakingInfoItems: { label: string; value: string }[];
  alwaysVisibleItems?: { label: string; value: string }[];
}

const StakingInfo = ({ isExpandable, theme, title, stakingInfoItems, alwaysVisibleItems }: StakingInfoProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const arrowsTheme = theme === "black" ? "white" : "black";

  const handleExpandInfo = () => {
    setExpanded(!isExpanded);
  };

  return (
    <StakingInfoWrapper
      $theme={theme}
      $itemsCenter={isExpandable}
      onClick={isExpandable && !isExpanded ? handleExpandInfo : undefined}
    >
      <StakingInfoHeaderText $theme={theme} $textCenter={isExpandable && !alwaysVisibleItems}>
        {title}
      </StakingInfoHeaderText>
      {alwaysVisibleItems &&
        alwaysVisibleItems.length > 0 &&
        alwaysVisibleItems.map((item, index) => (
          <>
            <StakingInfoItem $theme={theme} key={index}>
              <span>{item.label}</span>
              {item.label === "Network" ? (
                <NetworkValueBox>
                  <img src={IcTonLogo} alt="TON_logo" />
                  <p>{item.value}</p>
                </NetworkValueBox>
              ) : (
                <p>{item.value}</p>
              )}
            </StakingInfoItem>
            {index < alwaysVisibleItems.length - 1 && <StakingInfoDivider $theme={theme} />}
          </>
        ))}
      {alwaysVisibleItems && alwaysVisibleItems.length > 0 && isExpanded && <StakingInfoDivider $theme={theme} />}

      {isExpandable && !isExpanded && (
        <StakingInfoBottomBox $marginTop={Boolean(alwaysVisibleItems)} onClick={handleExpandInfo}>
          <DoubleArrows stroke={arrowsTheme} direction="down" />
        </StakingInfoBottomBox>
      )}
      {(!isExpandable || isExpanded) && stakingInfoItems && stakingInfoItems.length > 0 && (
        <>
          {stakingInfoItems.map((item, index) => (
            <>
              <StakingInfoItem $theme={theme} key={index}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </StakingInfoItem>
              {index < stakingInfoItems.length - 1 && <StakingInfoDivider $theme={theme} />}
            </>
          ))}
          {isExpandable && (
            <StakingInfoBottomBox $marginTop onClick={handleExpandInfo}>
              <DoubleArrows stroke={arrowsTheme} direction="up" />
            </StakingInfoBottomBox>
          )}
        </>
      )}
    </StakingInfoWrapper>
  );
};

export default StakingInfo;

const StakingInfoWrapper = styled.div<{ $theme: Theme; $marginTop?: boolean; $itemsCenter?: boolean }>`
  width: 100%;
  display: inline-flex;
  padding: 1.5rem 2rem;
  flex-direction: column;
  align-items: ${({ $itemsCenter }) => ($itemsCenter ? "center" : "flex-start")};
  gap: 0.3rem;

  border-radius: 2rem;
  background: ${({ $theme }) => ($theme === "black" ? "#1a1b23" : "#fff")};

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const StakingInfoHeaderText = styled.p<{ $theme: Theme; $textCenter?: boolean }>`
  width: 100%;
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  color: ${({ $theme }) => ($theme === "black" ? "#fff" : "#303234")};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: ${({ $textCenter }) => ($textCenter ? "center" : "left")};

  margin-bottom: 1rem;
`;

const StakingInfoItem = styled.div<{ $theme: Theme }>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: #aaaeaf;
  }

  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
    color: ${({ $theme }) => ($theme === "black" ? "#fff" : "#303234")};
    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StakingInfoDivider = styled.div<{ $theme: Theme }>`
  width: 100%;
  height: 1px;

  background: ${({ $theme }) => ($theme === "black" ? "#46494A" : "#F1F4F4")};

  margin: 0.9rem 0;
`;

const StakingInfoBottomBox = styled.div<{ $marginTop?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: ${({ $marginTop }) => ($marginTop ? "2.9rem" : "0")};

  cursor: pointer;
`;

const NetworkValueBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: end;
  gap: 0.6rem;
`;
