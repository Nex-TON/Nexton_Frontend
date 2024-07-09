import { useEffect, useState } from "react";
import { mutate } from "swr";

import IcRefresh from "@/assets/icons/MyAsset/ic_refresh.svg";
import { useBotPerformanceSummary } from "@/hooks/api/dashboard/useBotPerformanceSummary";
import {
  AssetBottomBox,
  AssetBottomLeft,
  AssetBottomLeftItem,
  AssetBottomLeftItemTitle,
  AssetBottomLeftItemValue,
  AssetBottomRight,
  AssetBottomRightItem,
  AssetBottomTitle,
  AssetBottomValue,
  AssetInnerBox,
  AssetLeftItem,
  AssetTopBox,
  AssetTopLeft,
  AssetTopRight,
  MyAssetWrapper,
} from "@/pages/Menu/Menu.styled";
import { limitDecimals } from "@/utils/limitDecimals";

import Loader from "../common/Loader";

import MainButton from "./MainButton";

type AssetsView = "dashboard" | "asset";

const tele = (window as any).Telegram.WebApp;

const MainMyAssetInfo = ({
  address,
  balance,
  refreshTonData,
  totalStaked,
  isLoading,
  isError,
}: {
  address: string;
  balance: number;
  refreshTonData: () => Promise<void>;
  totalStaked: number;
  isLoading: boolean;
  isError: boolean;
}) => {
  const [userId, setUserId] = useState<number>();
  const [view, setView] = useState<AssetsView>("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: performanceData, isLoading: performanceLoading } = useBotPerformanceSummary(userId);

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
    <MyAssetWrapper>
      <AssetInnerBox>
        <AssetTopBox>
          <AssetTopLeft>
            <AssetLeftItem $isActive={view === "dashboard"} onClick={() => handleViewChange("dashboard")}>
              Dashboard
            </AssetLeftItem>
            <AssetLeftItem $isActive={view === "asset"} onClick={() => handleViewChange("asset")}>
              My Asset
            </AssetLeftItem>
          </AssetTopLeft>

          <AssetTopRight>{address && <img src={IcRefresh} alt="icon_refresh" onClick={handleRefresh} />}</AssetTopRight>
        </AssetTopBox>

        {view === "dashboard" ? (
          <>
            <AssetBottomLeft>
              <AssetBottomTitle>Balance</AssetBottomTitle>
              <AssetBottomLeftItemValue>
                {isRefreshing ? (
                  <Loader />
                ) : (
                  <>
                    <h4>{balance === 0 || balance ? balance.toFixed(3) : "-.--"}</h4> <span>TON</span>
                  </>
                )}
              </AssetBottomLeftItemValue>
            </AssetBottomLeft>

            <AssetBottomBox>
              <AssetBottomTitle>Staked</AssetBottomTitle>
              <AssetBottomValue>
                {isError ? "-.-- TON" : isLoading || isRefreshing ? <Loader /> : `${totalStaked.toFixed(3)} TON`}
              </AssetBottomValue>
            </AssetBottomBox>
          </>
        ) : (
          <AssetBottomBox>
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
                      <h4>{isError ? "-.-- TON" : isLoading || isRefreshing ? <Loader /> : totalStaked.toFixed(3)}</h4>
                      <span>TON</span>
                    </>
                  )}
                </AssetBottomLeftItemValue>
              </AssetBottomLeftItem>
            </AssetBottomLeft>

            <AssetBottomRight>
              <AssetBottomRightItem>
                <span>PNL</span>
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
          </AssetBottomBox>
        )}
      </AssetInnerBox>

      <MainButton />
    </MyAssetWrapper>
  );
};

export default MainMyAssetInfo;
