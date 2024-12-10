import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import BasicModal from "@/components/common/Modal/BasicModal";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { ConfirmRepaymentModal } from "@/components/loan/Repay/ConfirmRepaymentModal";
import { isDevMode } from "@/utils/isDevMode.ts";
import * as Contract from "@/hooks/contract/repay";
import { useRepayNftDetail } from "@/hooks/api/loan/useReapyNftDetail";
import { toNano } from "@ton/core";
import { limitDecimals } from "@/utils/limitDecimals";
import { useNFTDetail } from "@/hooks/api/useNFTDetail";
import { nftInfo } from "@/types/Nft";
import { globalError } from "@/lib/atom/globalError";

import {
  RepaymentContentBox,
  RepaymentHeaderBox,
  RepaymentHeaderBoxTitle,
  RepaymentWrapper,
  RepayRateBox,
  RepayRateBoxBottom,
  RepayRateBoxDivider,
  RepayRateBoxHeader,
} from "./RepaymentDetails.styled";
import { postRepayInfo } from "@/api/postRepayInfo";
import useTonConnect from "@/hooks/contract/useTonConnect";
import { useSetRecoilState } from "recoil";

interface ModalState {
  type: "repay" | "confirmRepay";
  toggled: boolean;
}

const tele = (window as any).Telegram?.WebApp;

// ! Data is currently mocked
const RepaymentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sendMessage, refresh, isLoading: contractLoading } = Contract.repay(id);
  const { data: borrowDetail } = useRepayNftDetail(Number(id));
  const { nftDetail } = useNFTDetail(Number(id));
  const { address } = useTonConnect();
  const [isLoading, setIsLoading] = useState(false);
  const setError = useSetRecoilState(globalError);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const alwaysVisibleItems = [
    { label: "Borrowed nxTON", value: `${limitDecimals(borrowDetail?.repayAmount, 3)} nxTON` },
    { label: "Principal", value: `${borrowDetail?.principal} TON` },
    { label: "LTV", value: `${borrowDetail?.loanToValue}%` },
    { label: "Interest rate", value: `${borrowDetail?.interestRate}%` },
  ];
  const stakingInfoItems = nftDetail && [
    {
      header: "Collateralizing NFT info",
      items: [
        { label: "NFT ID", value: `${borrowDetail?.nftId}` },
        { label: "Network", value: "TON" },
      ],
    },
    {
      header: "Staking info",
      items: [
        { label: "Principal", value: `${nftDetail[0]?.principal} TON` },
        { label: "Nominator Pool", value: `${nftDetail[0]?.nominator}` },
        { label: "Leveraged", value: `${nftDetail[0]?.leverage}X` },
        { label: "Lockup period", value: `${nftDetail[0]?.lockPeriod}` },
        { label: "Unstakable date", value: new Date(nftDetail[0].unstakableDate).toLocaleDateString() },
        { label: "Protocol Fees", value: "2%" },
        { label: "Total Amount", value: `${limitDecimals(nftDetail[0]?.totalAmount, 3)} TON` },
      ],
    },
  ];

  const [modal, setModal] = useState<ModalState>({
    type: "confirmRepay",
    toggled: false,
  });

  const toggleModal = () => {
    setModal(prev => ({
      type: prev.type,
      toggled: !prev.toggled,
    }));
  };

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.show();
      tele.onEvent("backButtonClicked", () => {
        navigate("/loan");
      });
    }

    return () => {
      if (tele) {
        tele.offEvent("backButtonClicked");
      }
    };
  }, [navigate]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };
    initializeData();
  }, [refresh, id]);

  const handleRepayConfirm = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = () => {
        return {
          query_id: BigInt(Date.now()),
          amount: 111, //Mock data. Replace with real data later.
          value: toNano("0.06"),
          forward_ton_amount: toNano("0.01"),
        };
      };

      await sendMessage(data());
      await delay(50000);
      await postRepayInfo({
        nftId: Number(id),
        address: address,
      });
      toggleModal();

      setModal({ type: "repay", toggled: true });
    } catch (error) {
      console.error("Error during borrow confirmation:", error); // 에러 로그
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [contractLoading]);

  return (
    <div>
      <RepaymentWrapper>
        <RepaymentHeaderBox>
          <RepaymentHeaderBoxTitle>
            <h1>Repayment</h1>
          </RepaymentHeaderBoxTitle>
        </RepaymentHeaderBox>

        <RepaymentContentBox>
          <StakingInfo
            isExpandable={true}
            theme="white"
            title={`Loan ${borrowDetail?.loanId}`}
            alwaysVisibleItems={alwaysVisibleItems}
            stakingInfoItems={stakingInfoItems}
            status={borrowDetail?.status}
          />

          <RepayRateBox>
            <RepayRateBoxHeader>Amount to be repaid</RepayRateBoxHeader>
            <RepayRateBoxDivider />
            <RepayRateBoxBottom>{borrowDetail?.repayAmount} nxTON</RepayRateBoxBottom>
          </RepayRateBox>
        </RepaymentContentBox>

        {!isDevMode ? (
          <MainButton text="Pay now" onClick={toggleModal} />
        ) : (
          <button onClick={toggleModal}>Pay now</button>
        )}
      </RepaymentWrapper>

      {isLoading && <TransactionConfirmModal />}
      {modal.type === "confirmRepay" && modal.toggled && (
        <ConfirmRepaymentModal toggleModal={toggleModal} onConfirm={handleRepayConfirm} />
      )}

      {modal.type === "repay" && modal.toggled && (
        <BasicModal isDark type="repay" toggleModal={toggleModal} onClose={() => console.log("Repayed!")} />
      )}
    </div>
  );
};

export default RepaymentDetails;
