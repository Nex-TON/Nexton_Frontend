import { useWalletData } from "@/context/WalletConnectionProvider";
import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";

const useBorrowNftListFilter = () => {
  const { address } = useWalletData();
  const { borrowList } = useRepayNftList(address);

  const handlePrintBorrowListFilter = () => {
    return borrowList?.filter(item => {
      const nftState = item.status;
      return nftState == 0 && item;
    });
  };
  return { handlePrintBorrowListFilter };
};
export default useBorrowNftListFilter;
