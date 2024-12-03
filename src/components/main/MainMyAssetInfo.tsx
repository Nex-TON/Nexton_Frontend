import { useState,useRef } from "react";
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
import NxtPointTooltip from "@/assets/image/nxt_point_tooltip.png";
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: performanceData, isLoading: performanceLoading } = useBotPerformanceSummary();
  const { data: chartData, isLoading: chartLoading } = useBotPerformanceChart(0);
  const { data: earningsData, isLoading: earningsLoading, error: earningsError } = useEarningsbyAddress(address);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
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
  const handleTouchStart=(e:React.TouchEvent)=>{
    touchStartX.current=e.touches[0].clientX;
    touchEndX.current=e.touches[0].clientX;
  }

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
    <MainWrapper
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      >
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
          <DashboardBottomBox onClick={() => navigate("/dashboard")} id="mainmyassetinfodashboard">
            <DashboardBottomLeft id="mainmyassetinfodashboard">
              <DashboardBottomLeftTitleBox id="mainmyassetinfodashboard">
                <DashboardBottomLeftTitle id="mainmyassetinfodashboard">Arbitrage Bot</DashboardBottomLeftTitle>

                <APYBox id="mainmyassetinfodashboard">
                  <span id="mainmyassetinfodashboard">APY</span>
                  <h4 id="mainmyassetinfodashboard">
                    {performanceData?.apy ? `${performanceData?.apy.toFixed(2)}%` : "-"}
                  </h4>
                </APYBox>
              </DashboardBottomLeftTitleBox>

              <DashboardBottomLeftData id="mainmyassetinfodashboard">
                {performanceLoading || chartLoading ? (
                  <Loader />
                ) : (
                  <>
                    <DashboardBottomLeftDataItem id="mainmyassetinfodashboard">
                      <span id="mainmyassetinfodashboard">bot PNL</span>
                      <h4 id="mainmyassetinfodashboard">
                        {performanceData?.pnlRate ? `${limitDecimals(performanceData?.pnlRate, 2)}%` : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem id="mainmyassetinfodashboard">
                      <span id="mainmyassetinfodashboard">Daily PNL</span>
                      <h4 id="mainmyassetinfodashboard">
                        {chartData
                          ? `${chartData?.dailyPnlRate > 0 ? "+" : ""}${limitDecimals(chartData?.dailyPnlRate, 2)}%`
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
                        {performanceData?.tvl ? `${limitDecimals(performanceData?.tvl, 3)} TON` : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>

                    <DashboardBottomLeftDataItem onClick={() => navigate("/dashboard")} id="mainmyassetinfodashboard">
                      <img src={IcSmallArrowRight} alt="small_arrow_right" />
                    </DashboardBottomLeftDataItem>
                  </>
                )}
              </DashboardBottomLeftData>
            </DashboardBottomLeft>
          </DashboardBottomBox>
        ) : (
          <AssetBottomBox onClick={() => {connected?navigate("/myasset/nftlist#specific-element-total-balance"):""}}>
            {!connected ? (
              <AssetBottomNotConnected onClick={() => tonConnectUI.connectWallet()} id="mainmyassetinfoconnectwallet">
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

      <MainButton />
    </MainWrapper>
  );
};

export default MainMyAssetInfo;

const RightItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

`;