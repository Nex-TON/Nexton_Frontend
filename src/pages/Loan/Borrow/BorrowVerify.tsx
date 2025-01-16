import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal.tsx";
import { ConfirmBorrowModal } from "@/components/loan/Borrow/ConfirmBorrowModal.tsx";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { isDevMode } from "@/utils/isDevMode.ts";
import * as Contract from "@/hooks/contract/transferNFT";
import { toNano, Address } from "@ton/core";
import { useLoanDetail } from "@/hooks/api/loan/useLoanDetail.tsx";
import { globalError } from "@/lib/atom/globalError";

import { BorrowHeaderBox, BorrowHeaderBoxTitle, BorrowWrapper } from "./BorrowDetails.styled.tsx";
import { postLendingInfo } from "@/api/postLendingInfo.ts";
import { telegramAtom } from "@/lib/atom/telegram.ts";
import { limitDecimals } from "@/utils/limitDecimals.ts";
import BasicModal from "@/components/common/Modal/BasicModal.tsx";
import axios from "axios";
import { useNFTDetail } from "@/hooks/api/useNFTDetail.tsx";
import { useWalletData } from "@/context/WalletConnectionProvider.tsx";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "borrow" | "confirmBorrow";
  toggled: boolean;
}

// ! Data is currently mocked
const BorrowVerify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { sendWithData } = Contract.transferNft(id);
  const { address } = useWalletData();
  const { borrowAmount } = location.state || {};
  const { data: loanInfo } = useLoanDetail(Number(id), address, "pre");
  const telegramId = useRecoilValue(telegramAtom);
  const setError = useSetRecoilState(globalError);
  const [isLoading, setIsLoading] = useState(false);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const { nftDetail } = useNFTDetail(Number(id));

  const stakingInfoItems = [
    {
      items: [
        { label: "Borrowed NxTON", value: `${limitDecimals(loanInfo?.nxTonAmount, 3)} NxTON` },
        {
          label: "Principal",
          value: `${limitDecimals(loanInfo?.principal, 3)} ${nftDetail && nftDetail[0].tokenSort == "nxTON" ? "NxTON" : nftDetail && nftDetail[0].tokenSort}`,
        },
        { label: "LTV", value: `${limitDecimals(loanInfo?.loanToValue * 100, 2)}%` },
      ],
    },
  ];

  const [modal, setModal] = useState<ModalState>({
    type: "confirmBorrow",
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
        navigate(`/loan/${id}/borrow/risk-disclosure`);
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, []);

  const handleBorrow = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = () => {
        return {
          queryId: BigInt(Date.now()),
          value: toNano("0.102"),
          newOwner: Address.parse(import.meta.env.VITE_LEND_CONTRACT),
          responseAddress: Address.parse(address),
          fwdAmount: toNano("0.052"),
        };
      };

      await sendWithData(data(), toNano("0.05"));
      let timeRotate = 0;
      while (true) {
        const response = await axios.get(`/data/validate-lending?nftId=${Number(id)}`, {
          baseURL: `${import.meta.env.VITE_BASE_URL}`,
        });
        const validation = response.status;
        if (validation && validation == 200 && timeRotate <= 24) {
          break;
        } else if (validation && validation == 202 && timeRotate <= 24) {
        } else {
          break;
        }
        timeRotate += 1;
        await delay(5000);
      }
      const response = await postLendingInfo({
        telegramId: Number(telegramId),
        address: address,
        amount: borrowAmount,
        nftId: Number(id),
      });

      if (response === 200) {
        setModal({ type: "borrow", toggled: true });
      } else {
        throw new Error(`${response}`);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [sendWithData, setError, borrowAmount, telegramId, address, id]);

  const handleBorrowConfirm = () => {
    toggleModal();
    handleBorrow();
  };

  return (
    <>
      <BorrowWrapper>
        <BorrowHeaderBox>
          <BorrowHeaderBoxTitle>
            <h1>Loan</h1>
          </BorrowHeaderBoxTitle>
        </BorrowHeaderBox>

        <ProgressBar currentStep={3} />

        <div style={{ marginTop: "2rem" }}>
          <StakingInfo
            isExpandable={false}
            theme="white"
            title={`Loan ${loanInfo?.loanId}`}
            stakingInfoItems={stakingInfoItems}
          />
        </div>

        {!isDevMode ? (
          <MainButton text="Confirm loan" onClick={() => setModal({ type: "confirmBorrow", toggled: true })} />
        ) : (
          <button onClick={() => setModal({ type: "confirmBorrow", toggled: true })}>Confirm loan</button>
        )}
      </BorrowWrapper>

      {isLoading && <TransactionConfirmModal />}
      {modal.type === "confirmBorrow" && modal.toggled && (
        <ConfirmBorrowModal toggleModal={toggleModal} onConfirm={handleBorrowConfirm} />
      )}
      {modal.type === "borrow" && modal.toggled && (
        <BasicModal isDark type="loan" toggleModal={toggleModal} navigateOnClose="/loan" />
      )}
    </>
  );
};

export default BorrowVerify;
