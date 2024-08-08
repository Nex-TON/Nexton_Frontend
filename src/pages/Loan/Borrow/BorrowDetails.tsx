import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import IcExclude from "@/assets/icons/Loan/ic_exclude.svg";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { isDevMode } from "@/utils/isDevMode.ts";

import {
  BorrowContentBox,
  BorrowHeaderBox,
  BorrowHeaderBoxTitle,
  BorrowRateBox,
  BorrowRateBoxBottom,
  BorrowRateBoxDivider,
  BorrowRateBoxHeader,
  BorrowRateBoxHeaderLeft,
  BorrowRateBoxHeaderRight,
  BorrowWrapper,
  ExcludeBox,
} from "./BorrowDetails.styled.tsx";

const tele = (window as any).Telegram.WebApp;

const alwaysVisibleItems = [
  { label: "Token ID", value: "4817sddss863ddddwdwsdwd" },
  { label: "Network", value: "TON" },
  { label: "LTV", value: "50.0%" },
];

const stakingInfoItems = [
  {
    header: "Staking info",
    items: [
      { label: "Principal", value: "10,000 TON" },
      { label: "Nominator Pool", value: "DG Pool #1" },
      { label: "Leveraged", value: "X1.0" },
      { label: "Lockup period", value: "60 days" },
      { label: "Unstakable date", value: "DD.MM.YY" },
      { label: "Protocol Fees", value: "2%" },
      { label: "Staking APR", value: "5%" },
      { label: "Total Amount", value: "10,083 TON" },
    ],
  },
];

// ! Data is currently mocked
const BorrowDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const { nftDetail } = useNFTDetail(Number(id));

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan/1");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  return (
    <BorrowWrapper>
      <BorrowHeaderBox>
        <BorrowHeaderBoxTitle>
          <h1>Loan</h1>
        </BorrowHeaderBoxTitle>
      </BorrowHeaderBox>

      <ProgressBar currentStep={1} />

      <BorrowContentBox>
        <StakingInfo
          isExpandable={true}
          theme="black"
          title="Collateralizing NFT info"
          alwaysVisibleItems={alwaysVisibleItems}
          stakingInfoItems={stakingInfoItems}
        />

        <ExcludeBox>
          <img src={IcExclude} alt="exclude_icon" />
        </ExcludeBox>

        <BorrowRateBox>
          <BorrowRateBoxHeader>
            <BorrowRateBoxHeaderLeft>Borrow</BorrowRateBoxHeaderLeft>
            <BorrowRateBoxHeaderRight>1NXT = n TON</BorrowRateBoxHeaderRight>
          </BorrowRateBoxHeader>
          <BorrowRateBoxDivider />
          <BorrowRateBoxBottom>000.00 nxTON</BorrowRateBoxBottom>
        </BorrowRateBox>
      </BorrowContentBox>

      {!isDevMode ? (
        <MainButton text="Next" onClick={() => navigate(`/loan/${id}/borrow/risk-disclosure`)} />
      ) : (
        <button onClick={() => navigate(`/loan/${id}/borrow/risk-disclosure`)}>next</button>
      )}
    </BorrowWrapper>
  );
};

export default BorrowDetails;
