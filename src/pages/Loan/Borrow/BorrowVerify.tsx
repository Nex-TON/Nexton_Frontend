import { useEffect, useState ,useCallback} from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import { MainButton } from "@vkruglikov/react-telegram-web-app";

import BasicModal from "@/components/common/Modal/BasicModal.tsx";
import TransactionConfirmModal from "@/components/common/Modal/TransactionConfirmModal.tsx";
import { ConfirmBorrowModal } from "@/components/loan/Borrow/ConfirmBorrowModal.tsx";
import ProgressBar from "@/components/loan/common/ProgressBar.tsx";
import StakingInfo from "@/components/loan/common/StakingInfo.tsx";
import { isDevMode } from "@/utils/isDevMode.ts";
import * as Contract from "@/hooks/contract/transferNFT";
import useTonConnect from "@/hooks/contract/useTonConnect.ts";
import { toNano,Address } from "@ton/core";
import { useLoanDetail } from "@/hooks/api/loan/useLoanDetail.tsx";

import { BorrowHeaderBox, BorrowHeaderBoxTitle, BorrowWrapper } from "./BorrowDetails.styled.tsx";
import { postLendingInfo,postLendingInfoProps } from "@/api/postLendingInfo.ts";
import { useRecoilValue } from "recoil";
import { telegramAtom } from "@/lib/atom/telegram.ts";

const tele = (window as any).Telegram.WebApp;

interface ModalState {
  type: "borrow" | "confirmBorrow";
  toggled: boolean;
}

const stakingInfoItems = [
  {
    items: [
      { label: "Borrowed nxTON", value: "000.00 nxTON" },
      { label: "Principal", value: "00000 TON" },
      { label: "LTV", value: "95.0%" },
    ],
  },
];

// ! Data is currently mocked
const BorrowVerify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location=useLocation();
  const { sendWithData } = Contract.transferNft(id);
  const { address } = useTonConnect();
  const {borrowAmount}=location.state||{};
  const {data:loanInfo,isLoading,error}=useLoanDetail(Number(id));
  const telegramId=useRecoilValue(telegramAtom);



  console.log(`borrow amount:${borrowAmount}`)//for the test

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
        navigate("/loan/1/borrow/risk-disclosure");
      });
    }

    return () => {
      tele.offEvent("backButtonClicked");
    };
  }, [navigate]);

  const handleBorrowConfirm = useCallback(async () => {
    try {
      const newLending: postLendingInfoProps = {
        telegramId: Number(telegramId),
        address:address,
    amount:borrowAmount,
    nftId:Number(id),

      };

      const data = () => {
        return {
          queryId: BigInt(Date.now()),
          value: toNano("0.06"),
          newOwner: Address.parse(import.meta.env.VITE_LEND_CONTRACT),
          responseAddress: Address.parse(address),
          fwdAmount: toNano("0.01"),
        };
      };

      await sendWithData(data(), toNano("0.05"));
      //TODO: send server message
      await postLendingInfo(newLending);
      
    } catch (error) {
      return;
    } finally {
    }

    toggleModal();

    setModal({ type: "borrow", toggled: true });
  }, [address, id, navigate]);

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
          <StakingInfo isExpandable={false} theme="white" title="Loan 01" stakingInfoItems={stakingInfoItems} />
        </div>

        {!isDevMode ? (
          <MainButton text="Confirm loan" onClick={toggleModal} />
        ) : (
          <button onClick={toggleModal}>Confirm loan</button>
        )}
      </BorrowWrapper>

      {false && <TransactionConfirmModal />}
      {modal.type === "confirmBorrow" && modal.toggled && (
        <ConfirmBorrowModal toggleModal={toggleModal} onConfirm={handleBorrowConfirm} />
      )}
      {modal.type === "borrow" && modal.toggled && (
        <BasicModal isDark type="borrow" toggleModal={toggleModal} onClose={() => console.log("Borrowed!")} />
      )}
    </>
  );
};

export default BorrowVerify;
