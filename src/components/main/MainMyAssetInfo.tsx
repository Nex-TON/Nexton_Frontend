import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import TagManager from "react-gtm-module";

// import { VscInfo } from "react-icons/vsc";
import { Tooltip } from "@mui/material";
import IcArrowRight from "@/assets/icons/MyAsset/ic_arrow_right.svg";
import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";
import IcSmallArrowRight from "@/assets/icons/MyAsset/ic_small_arrow_right.svg";
import IcWallet from "@/assets/icons/MyAsset/ic_wallet.svg";
import { useBotPerformanceChart } from "@/hooks/api/dashboard/useBotPerformanceChart";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import { useEarningsbyAddress } from "@/hooks/api/dashboard/useEarningsbyAddress";
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

  const handleConnectWallet=()=>{
    const tagManagerArgs={
      dataLayer:{
        event:"connect wallet",
      },
    };
    TagManager.dataLayer(tagManagerArgs);

    tonConnectUI.connectWallet();
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
    <MainWrapper>
      <MainInnerBox>
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
                      <h4>{performanceData?.pnlRate ? `${limitDecimals(performanceData?.pnlRate, 2)}%` : "-"}</h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem>
                      <span>Daily PNL</span>
                      <h4>
                        {chartData?.dailyPnlRate
                          ? `${chartData?.dailyPnlRate > 0 ? "+" : ""}${limitDecimals(chartData?.dailyPnlRate, 2)}%`
                          : "-"}
                      </h4>
                    </DashboardBottomLeftDataItem>
                    <DashboardBottomLeftDataItem>
                        <span style={{gap:"6px", alignItems:"center",display:"flex",justifyContent:""}}>
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
                      <h4>{performanceData?.tvl ? `${limitDecimals(performanceData?.tvl, 3)} TON` : "-"}</h4>
                    </DashboardBottomLeftDataItem>

                    <DashboardBottomLeftDataItem onClick={() => navigate("/dashboard")}>
                      <img src={IcSmallArrowRight} alt="small_arrow_right" />
                    </DashboardBottomLeftDataItem>
                  </>
                )}
              </DashboardBottomLeftData>
            </DashboardBottomLeft>
          </DashboardBottomBox>
        ) : (
          <AssetBottomBox>
            {!connected ? (
              <AssetBottomNotConnected onClick={handleConnectWallet}>
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
                          <h4>{balance === 0 || balance ? balance?.toFixed(3) : "-.--"}</h4> <span>TON</span>
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
                            {isError ? "-.-- " : isLoading || isRefreshing ? <Loader /> : totalStaked?.toFixed(3)}
                          </h4>
                          <span>TON</span>
                        </>
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
                        <>
                          <h4>
                            {isError || earningsError ? (
                              "-.-- "
                            ) : isLoading || earningsLoading ? (
                              <Loader />
                            ) : (
                              earningsData?.totalRewards.toFixed(3)
                            )}
                          </h4>
                          <span>TON</span>
                        </>
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
