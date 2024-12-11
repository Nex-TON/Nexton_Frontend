import { useState } from "react";
import React from "react";
import { styled } from "styled-components";

import IcTonLogo from "@/assets/icons/Loan/ic_ton_logo.svg";

import { DoubleArrows } from "./DoubleArrows";
import IcPaid from "@/assets/icons/Loan/ic_paid_off.svg";
import IcUnpaid from "@/assets/icons/Loan/ic_unpaid.svg";

type Theme = "black" | "white";

interface SectionItem {
  label: string;
  value: string | JSX.Element;
}

interface Section {
  header?: string;
  items: SectionItem[];
}

interface StakingInfoProps {
  isExpandable: boolean;
  theme: Theme;
  title: string;
  titleButton?: JSX.Element;
  alwaysVisibleItems?: SectionItem[];
  stakingInfoItems: Section[];
  status?: number;
}

const StakingInfo = ({
  isExpandable,
  theme,
  title,
  titleButton,
  stakingInfoItems,
  alwaysVisibleItems,
  status,
}: StakingInfoProps) => {
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
      <StakingInfoHeader $theme={theme} $textCenter={isExpandable && !alwaysVisibleItems}>
        <StakingInfoHeaderLeft $theme={theme} $textCenter={isExpandable && !alwaysVisibleItems}>
          {title}
        </StakingInfoHeaderLeft>
        {(status==0 ||status==1) && (
          <StakingInfoHeaderRight status={status}>
            <img src={status == 1 ? IcPaid : IcUnpaid} />
            <p>{status == 1 ? "Paid off" : "Unpaid"}</p>
          </StakingInfoHeaderRight>
        )}
        {titleButton && titleButton}
      </StakingInfoHeader>
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

      {isExpandable && !isExpanded && (
        <StakingInfoBottomBox $marginTop={Boolean(alwaysVisibleItems)} onClick={handleExpandInfo}>
          <DoubleArrows stroke={arrowsTheme} direction="down" />
        </StakingInfoBottomBox>
      )}
      {(!isExpandable || isExpanded) && stakingInfoItems && stakingInfoItems.length > 0 && (
        <>
          {stakingInfoItems.map((section, index) => (
            <React.Fragment key={`section-${index}`}>
              {section.header && (
                <StakingInfoHeader $marginTop $theme={theme}>
                  <p>{section.header}</p>
                </StakingInfoHeader>
              )}
              {section.items.map((sectionItem, index) => (
                <React.Fragment key={`section-item-${index}`}>
                  <StakingInfoItem $theme={theme} key={index}>
                    <span>{sectionItem.label}</span>
                    {sectionItem.label === "Network" ? (
                      <NetworkValueBox>
                        <img src={IcTonLogo} alt="TON_logo" />
                        <p>{sectionItem.value}</p>
                      </NetworkValueBox>
                    ) : (
                      <p>{sectionItem.value}</p>
                    )}
                  </StakingInfoItem>
                  {index < section.items.length - 1 && <StakingInfoDivider $theme={theme} />}
                </React.Fragment>
              ))}
            </React.Fragment>
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

const StakingInfoHeaderRight = styled.div<{status}>`
  align-items: center;
  display: flex;
  flex-direction: row;
  img {
    width: 24px;
    height: 24px;
    margin-right: 0.9rem;
  }
  p {
    ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_3};
    color: ${({status})=>status==1?"#34C759":"#0C0F5E"};
  }
`;
const StakingInfoHeaderLeft = styled.div<{ $theme; $textCenter? }>`
  ${({ theme }) => theme.fonts.Nexton_Body_Text_Medium_2};
  font-size: 1.4rem;
  color: ${({ $theme }) => ($theme === "black" ? "#fff" : "#303234")};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: ${({ $textCenter }) => ($textCenter ? "center" : "left")};
`;

const StakingInfoWrapper = styled.div<{ $theme: Theme; $marginTop?: boolean; $itemsCenter?: boolean }>`
  width: 100%;
  display: inline-flex;
  padding: 1.5rem 2rem;
  flex-direction: column;
  align-items: ${({ $itemsCenter }) => ($itemsCenter ? "center" : "flex-start")};
  gap: 0.3rem;

  border-radius: 1.5rem;
  background: ${({ $theme }) => ($theme === "black" ? "#1a1b23" : "#fff")};

  /* drop shadow_type 4 */
  box-shadow: 0px 0px 12px 0px rgba(206, 216, 225, 0.5);
`;

const StakingInfoHeader = styled.div<{ $theme: Theme; $textCenter?: boolean; $marginTop?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ $textCenter }) => ($textCenter ? "center" : "space-between")};
  align-items: center;
  margin-bottom: 1rem;
  margin-top: ${({ $marginTop }) => ($marginTop ? "1.6rem" : "0")};
  font-size:2.24rem;
  ${({theme})=>theme.fonts.Nexton_Body_Text_Medium_2};
  font-size:2.24rem;
  p{
    color: ${({ $theme }) => ($theme === "black" ? "white" : "#303234")};
  }

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
