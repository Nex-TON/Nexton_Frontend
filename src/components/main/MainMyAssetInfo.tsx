import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";

import IcArrowRight from "@/assets/icons/MyAsset/ic_arrow_right.svg";
import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";
import IcSmallArrowRight from "@/assets/icons/MyAsset/ic_small_arrow_right.svg";
import IcWallet from "@/assets/icons/MyAsset/ic_wallet.svg";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import {
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

const tele = (window as any).Telegram.WebApp;

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

  const [userId, setUserId] = useState<number>();
  const [view, setView] = useState<AssetsView>("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: performanceData, isLoading: performanceLoading } = useBotPerformanceSummary(/* userId */ 1);

  useEffect(() => {
    if (tele) {
      tele.ready();

      const tgUser = tele.initDataUnsafe?.user;
      if (tgUser) {
        setUserId(tgUser?.id);
      } else {
        console.warn("You should launch the app inside the Telegram Mini App.");
      }
    }
  }, []);

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
        <MainTopBox $isConnected={connected}>
          <MainTopLeft>
            <MainLeftItem $isActive={view === "dashboard"} onClick={() => handleViewChange("dashboard")}>
              Dashboard
            </MainLeftItem>
            <MainLeftItem $isActive={view === "asset"} onClick={() => handleViewChange("asset")}>
              My Asset
            </MainLeftItem>
          </MainTopLeft>

          <MainTopRight>{address && <img src={IcRefresh} alt="icon_refresh" onClick={handleRefresh} />}</MainTopRight>
        </MainTopBox>

        {view === "dashboard" ? (
          <DashboardBottomBox>
            <DashboardBottomLeft>
              <DashboardBottomLeftTitle>Arbitrage Bot</DashboardBottomLeftTitle>
              <DashboardBottomLeftData>
                <DashboardBottomLeftDataItem>
                  <span>bot PNL</span>
                  <h4>
                    {performanceLoading ? (
                      <Loader />
                    ) : performanceData?.pnlRate ? (
                      `${performanceData?.pnlRate.toFixed(3)}%`
                    ) : (
                      "-"
                    )}
                  </h4>
                </DashboardBottomLeftDataItem>
                <DashboardBottomLeftDataItem>
                  <span>Daily PNL</span>
                  <h4>
                    {performanceLoading ? (
                      <Loader />
                    ) : performanceData?.pnlWinRate ? (
                      `${performanceData?.pnlRate.toFixed(0)}%`
                    ) : (
                      "-"
                    )}
                  </h4>
                </DashboardBottomLeftDataItem>
                <DashboardBottomLeftDataItem>
                  <span>Stakers</span>
                  <h4>
                    {performanceLoading ? (
                      <Loader />
                    ) : performanceData?.subscribedCount ? (
                      `${performanceData?.subscribedCount.toFixed(0)}`
                    ) : (
                      "-"
                    )}
                  </h4>
                </DashboardBottomLeftDataItem>
              </DashboardBottomLeftData>
            </DashboardBottomLeft>

            <DashboardBottomRight onClick={() => navigate("/dashboard")}>
              <img src={IcSmallArrowRight} alt="small_arrow_right" />
            </DashboardBottomRight>
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
