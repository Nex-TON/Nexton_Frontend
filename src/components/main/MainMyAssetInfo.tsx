import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";

import IcArrowRight from "@/assets/icons/MyAsset/ic_arrow_right.svg";
import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";
import IcSmallArrowRight from "@/assets/icons/MyAsset/ic_small_arrow_right.svg";
import IcWallet from "@/assets/icons/MyAsset/ic_wallet.svg";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import {
  APYBox,
  AssetBottomBox,
  AssetBottomLeft,
  AssetBottomLeftItem,
  AssetBottomLeftItemTitle,
  AssetBottomLeftItemValue,
  AssetBottomNotConnected,
  AssetBottomRight,
  AssetBottomRightItem,
  DashboardBottomBox,
  DashboardBottomLeft,
  DashboardBottomLeftData,
  DashboardBottomLeftDataItem,
  DashboardBottomLeftTitle,
  DashboardBottomLeftTitleBox,
  DashboardBottomRight,
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

  const handleViewChange = (view: AssetsView) => {
    setView(view);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await Promise.all([refreshTonData(), mutate(`/data/getAllStakeInfoByAddress?address=${address}`)]);
    } catch (error) {
      console.error("An error occurred during the refresh operation:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <MainWrapper>
      <MainInnerBox>
        {/* Will be removed in next release */}
        {/* <BackgroundChart $isVisible={view === "dashboard"} $src={MyAssetsDashboardBg} /> */}

        <MainTopBox $marginBottom={connected || view === "dashboard"}>
          <MainTopLeft>
            <MainLeftItem $isActive={view === "dashboard"} onClick={() => handleViewChange("dashboard")}>
              Dashboard
            </MainLeftItem>
            <MainLeftItem $isActive={view === "asset"} onClick={() => handleViewChange("asset")}>
              My Asset
            </MainLeftItem>
          </MainTopLeft>

          {view === "asset" && (
            <MainTopRight>{address && <img src={IcRefresh} alt="icon_refresh" onClick={handleRefresh} />}</MainTopRight>
          )}
        </MainTopBox>

        {view === "dashboard" ? (
          <DashboardBottomBox onClick={() => navigate("/dashboard")}>
            <DashboardBottomLeft>
              <DashboardBottomLeftTitleBox>
                <DashboardBottomLeftTitle>Arbitrage Bot</DashboardBottomLeftTitle>

                <APYBox>
                  <span>APY</span>
                  <h4>{performanceData?.apy ? `${performanceData?.apy.toFixed(2)}%` : "-"}</h4>
                </APYBox>
              </DashboardBottomLeftTitleBox>

              <DashboardBottomLeftData>
                {performanceLoading || chartLoading ? (
                  <Loader />
                ) : (
                  <>
                    <DashboardBottomLeftDataItem>
                      <span>bot PNL</span>
                      <h4>{performanceData?.pnlRate ? `${performanceData?.pnlRate.toFixed(3)}%` : "-"}</h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem>
                      <span>Daily PNL</span>
                      <h4>
                        {chartData?.dailyPnlRate
                          ? `${chartData?.dailyPnlRate > 0 ? "+" : ""}${chartData?.dailyPnlRate}%`
                          : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem>
                      <span>Stakers</span>
                      <h4>
                        {performanceData?.subscribedCount ? `${performanceData?.subscribedCount.toFixed(0)}` : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>

                    <DashboardBottomLeftDataItem onClick={() => navigate("/dashboard")}>
                      <img src={IcSmallArrowRight} alt="small_arrow_right" />
                    </DashboardBottomLeftDataItem>
                  </>
                )}
              </DashboardBottomLeftData>
            </DashboardBottomLeft>

            {/* <DashboardBottomRight onClick={() => navigate("/dashboard")}>
              <img src={IcSmallArrowRight} alt="small_arrow_right" />
            </DashboardBottomRight> */}
          </DashboardBottomBox>
        ) : (
          <AssetBottomBox>
            {!connected ? (
              <AssetBottomNotConnected onClick={() => tonConnectUI.connectWallet()}>
                <img src={IcWallet} alt="icon_wallet" />
                <p>Please connect your wallet.</p>
                <img src={IcArrowRight} alt="icon_arrow_right" />
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
                        <>
                          <h4>{balance === 0 || balance ? balance.toFixed(3) : "-.--"}</h4> <span>TON</span>
                        </>
                      )}
                    </AssetBottomLeftItemValue>
                  </AssetBottomLeftItem>

                  <AssetBottomLeftItem>
                    <AssetBottomLeftItemTitle>Staked</AssetBottomLeftItemTitle>
                    <AssetBottomLeftItemValue>
                      {isRefreshing ? (
                        <Loader />
                      ) : (
                        <>
                          <h4>
                            {isError ? "-.-- TON" : isLoading || isRefreshing ? <Loader /> : totalStaked.toFixed(3)}
                          </h4>
                          <span>TON</span>
                        </>
                      )}
                    </AssetBottomLeftItemValue>
                  </AssetBottomLeftItem>
                </AssetBottomLeft>

                <AssetBottomRight>
                  <AssetBottomRightItem>
                    <span>bot PNL</span>
                    <h4>
                      {performanceLoading ? (
                        <Loader />
                      ) : performanceData?.pnlRate ? (
                        `${limitDecimals(performanceData?.pnlRate, 3)}%`
                      ) : (
                        "-"
                      )}
                    </h4>
                  </AssetBottomRightItem>
                </AssetBottomRight>
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
