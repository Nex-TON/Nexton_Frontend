import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import styled from "styled-components";

import IcArrowRight from "@/assets/icons/MyAsset/chevron-right.svg";
import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";
import IcSmallArrowRight from "@/assets/icons/MyAsset/ic_small_arrow_right.svg";
import MyAssetNotConnected from "@/assets/image/MyAssetNotConnected.svg";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { useEarningsbyAddress } from "@/hooks/api/dashboard/useEarningsbyAddress";
import IcArrowRightGrey from "@/assets/icons/Stake/ic_arrow_right.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import stonfi from "@/assets/icons/Main/ic_stonfi_logo.svg";
import binance from "@/assets/icons/Main/ic_binance_logo.svg";
import hyperliquid from "@/assets/icons/Main/ic_hyperliquid_logo.svg";

import {
  // TvlNotice,
  APYBox,
  AssetBottomBox,
  AssetBottomLeft,
  AssetBottomLeftItem,
  AssetBottomLeftItemDivider,
  AssetBottomLeftItemTitle,
  AssetBottomLeftItemValue,
  AssetBottomNotConnected,
  AssetBottomNotConnectedImg,
  AssetBottomNotConnectedText,
  DashboardBottomBox,
  DashboardBottomLeft,
  DashboardBottomLeftData,
  DashboardBottomLeftDataItem,
  DashboardBottomLeftTitle,
  DashboardBottomLeftTitleBox,
  MainInnerBox,
  MainLeftItem,
  MainTopBox,
  MainTopLeft,
  MainTopRight,
  MainWrapper,
} from "@/pages/Menu/Menu.styled";
import { limitDecimals } from "@/utils/limitDecimals";

import Loader from "../common/Loader";

import MainButton from "./MainButton";

type AssetsView = "dashboard" | "asset";

const MainMyAssetInfo = ({
  tonConnectUI,
  connected,
  address,
  balance,
  refreshTonData,
  totalStaked,
  isLoading,
  isError,
}: {
  tonConnectUI: any;
  connected: boolean;
  address: string;
  balance: number;
  refreshTonData: () => Promise<void>;
  totalStaked: number;
  isLoading: boolean;
  isError: boolean;
}) => {
  const navigate = useNavigate();
  const [view, setView] = useState<AssetsView>("dashboard");
  const [connectToggled, setConnectToggled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [strategy, setStrategy] = useState(0);

  const { data: performanceData, isLoading: performanceLoading } = useBotPerformanceSummary();
  const { data: earningsData, isLoading: earningsLoading, error: earningsError } = useEarningsbyAddress(address);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const strategyIcons = {
    stonfi: stonfi,
    binance: binance,
    hyperliquid: hyperliquid, // 추가적인 거래소 여기 추가해줘야됨
  };

  const img1 = strategyIcons[performanceData?.summaryData[strategy]?.strategyDetails?.strategy1?.strategy] || "";
  const img2 = strategyIcons[performanceData?.summaryData[strategy]?.strategyDetails?.strategy2?.strategy] || "";

  const handleConnect = useCallback(async () => {
    await tonConnectUI.openModal();
    setConnectToggled(!connectToggled);
  }, [tonConnectUI]);

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setView("asset");
      } else {
        setView("dashboard");
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleViewChange = (view: AssetsView) => {
    setView(view);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await Promise.all([
        refreshTonData(),
        mutate(`/data/getAllStakeInfoByAddress?address=${address}`),
        mutate(`/data/getEarningsbyAddress/${address}`),
      ]);
    } catch (error) {
      console.error("An error occurred during the refresh operation:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <MainWrapper onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart}>
      <MainInnerBox>
        <MainTopBox $marginBottom={connected || view === "dashboard"}>
          <MainTopLeft>
            <MainLeftItem
              $isActive={view === "dashboard"}
              onClick={() => handleViewChange("dashboard")}
              id="mainmyaseetdashbordview"
            >
              Dashboard
            </MainLeftItem>
            <MainLeftItem
              $isActive={view === "asset"}
              onClick={() => handleViewChange("asset")}
              id="mainmyassetmyassetview"
            >
              My Asset
            </MainLeftItem>
          </MainTopLeft>

          {view === "asset" && (
            <MainTopRight>
              {address && (
                <img src={IcRefresh} alt="icon_refresh" onClick={handleRefresh} id="main myasset view refresh" />
              )}
            </MainTopRight>
          )}
        </MainTopBox>

        {view === "dashboard" ? (
          <DashboardBottomBox id="mainmyassetinfodashboard">
            <DashboardBottomLeft id="mainmyassetinfodashboard">
              <DashboardBottomLeftTitleBox id="mainmyassetinfodashboard">
                <DashboardBottomLeftTitle id="mainmyassetinfodashboard">
                  Arbitrage Bot
                  <StrategyOption.wrapper>
                    <FaChevronLeft
                      size={14}
                      color={strategy == 0 ? "#46494A" : "#C6CACA"}
                      onClick={() => {
                        if (strategy === 1) {
                          setStrategy(0);
                        }
                      }}
                    />
                    <p>
                      {performanceData?.summaryData[strategy]?.strategyDetails?.strategy1?.exchange} -{" "}
                      {performanceData?.summaryData[strategy]?.strategyDetails?.strategy2?.exchange} bot
                    </p>
                    <img src={img1} style={{marginRight:"3px"}}/>
                    <img src={img2} />
                    <FaChevronRight
                      size={14}
                      color={strategy === 1 ? "#46494A" : "#C6CACA"}
                      onClick={() => {
                        if (strategy == 0) {
                          setStrategy(1);
                        }
                      }}
                    />
                  </StrategyOption.wrapper>
                </DashboardBottomLeftTitle>

                <APYBox onClick={() => navigate("/dashboard")} id="mainmyassetinfodashboard">
                  <span id="mainmyassetinfodashboard">APY</span>
                  <h4 id="mainmyassetinfodashboard">
                    {performanceData?.summaryData[strategy]?.apy ? `${performanceData?.summaryData[strategy]?.apy.toFixed(2)}%` : "-"}
                  </h4>
                </APYBox>
              </DashboardBottomLeftTitleBox>

              <DashboardBottomLeftData onClick={() => navigate("/dashboard")} id="mainmyassetinfodashboard">
                {performanceLoading ? (
                  <Loader />
                ) : (
                  <>
                    <DashboardBottomLeftDataItem id="mainmyassetinfodashboard">
                      <span id="mainmyassetinfodashboard">bot PNL</span>
                      <h4 id="mainmyassetinfodashboard">
                        {performanceData?.summaryData[strategy]?.pnlRate
                          ? `${limitDecimals(performanceData?.summaryData[strategy]?.pnlRate, 2)}%`
                          : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem id="mainmyassetinfodashboard">
                      <span id="mainmyassetinfodashboard">Daily PNL</span>
                      <h4 id="mainmyassetinfodashboard">
                        {performanceData
                          ? `${performanceData?.summaryData[strategy]?.pnlRate > 0 ? "+" : ""}${limitDecimals(performanceData?.summaryData[strategy]?.pnlRate, 2)}%`
                          : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem id="mainmyassetinfodashboard">
                      <span
                        style={{ gap: "6px", alignItems: "center", display: "flex", justifyContent: "" }}
                        id="mainmyassetinfodashboard"
                      >
                        TVL
                        {/* 보류 */}
                        {/* <Tooltip 
                          title="$TON + $nxTON"
                          open={false}
                          placement="top"
                          >
                          <VscInfo style={{width:"16px",height:"16px",color:"##C6C5D0"}} />
                          </Tooltip> */}
                      </span>
                      <h4 id="mainmyassetinfodashboard">
                        {performanceData?.summaryData[strategy]?.tvl
                          ? `${limitDecimals(performanceData?.summaryData[strategy]?.tvl, 3)} TON`
                          : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                  </>
                )}
              </DashboardBottomLeftData>
            </DashboardBottomLeft>
          </DashboardBottomBox>
        ) : (
          <AssetBottomBox
            onClick={() => {
              connected ? navigate("/myasset/nftlist#specific-element-total-balance") : "";
            }}
          >
            {!connected ? (
              <AssetBottomNotConnected onClick={() => handleConnect()} id="mainmyassetinfoconnectwallet">
                <AssetBottomNotConnectedImg>
                  <img src={MyAssetNotConnected} alt="my asset not connected image" />
                  <AssetBottomNotConnectedText>
                    <p id="mainmyassetinfoconnectwallet">Please connect your wallet.</p>
                    <img src={IcArrowRight} alt="icon_arrow_right" id="mainmyassetinfoconnectwallet" />
                  </AssetBottomNotConnectedText>
                </AssetBottomNotConnectedImg>
              </AssetBottomNotConnected>
            ) : (
              <>
                <AssetBottomLeft>
                  <AssetBottomLeftItem>
                    <AssetBottomLeftItemTitle>Balance</AssetBottomLeftItemTitle>
                    <AssetBottomLeftItemValue>
                      {isRefreshing ? (
                        <Loader />
                      ) : (
                        <RightItemWrapper>
                          <h4> {balance === 0 || balance ? balance?.toFixed(3) : "-.--"}</h4>
                          <span>TON</span>
                          <img src={IcArrowRightGrey} />
                        </RightItemWrapper>
                      )}
                    </AssetBottomLeftItemValue>
                  </AssetBottomLeftItem>

                  <AssetBottomLeftItem>
                    <AssetBottomLeftItemTitle>Staked</AssetBottomLeftItemTitle>
                    <AssetBottomLeftItemValue>
                      {isRefreshing ? (
                        <Loader />
                      ) : (
                        <RightItemWrapper>
                          <h4>
                            {isError ? "-.-- " : isLoading || isRefreshing ? <Loader /> : totalStaked?.toFixed(3)}
                          </h4>
                          <span>TON</span>
                          <img src={IcArrowRightGrey} />
                        </RightItemWrapper>
                      )}
                    </AssetBottomLeftItemValue>
                  </AssetBottomLeftItem>

                  <AssetBottomLeftItemDivider />

                  <AssetBottomLeftItem>
                    <AssetBottomLeftItemTitle>Earnings</AssetBottomLeftItemTitle>
                    <AssetBottomLeftItemValue>
                      {isRefreshing ? (
                        <Loader />
                      ) : (
                        <RightItemWrapper>
                          <h4>
                            {isError || earningsError ? (
                              "0.000"
                            ) : isLoading || earningsLoading ? (
                              <Loader />
                            ) : (
                              earningsData?.totalRewards.toFixed(3)
                            )}
                          </h4>
                          <span>TON</span>
                          <img src={IcArrowRightGrey} />
                        </RightItemWrapper>
                      )}
                    </AssetBottomLeftItemValue>
                  </AssetBottomLeftItem>
                </AssetBottomLeft>
              </>
            )}
          </AssetBottomBox>
        )}
      </MainInnerBox>
      <MainButton
        toggled={connectToggled}
        connected={connected}
        handleToggle={handleConnect}
        style={{ margin: "1.5rem 0 2.7rem 0" }}
      />
    </MainWrapper>
  );
};

export default MainMyAssetInfo;

const StrategyOption = {
  wrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    p {
      color: var(--Neutral-variant-Neutral-variant-80, #c6c5d0);
      font-family: Montserrat;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px; /* 138.462% */
    };
    img {
      width: 20px;
      height: 20px;
    };
  `,
};

const RightItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
