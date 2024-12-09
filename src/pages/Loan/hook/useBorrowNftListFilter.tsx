import { useRepayNftList } from "@/hooks/api/loan/useRepayNftList";
import useTonConnect from "@/hooks/contract/useTonConnect"


const useBorrowNftListFilter=()=>{
    const {address}=useTonConnect();
    const {borrowList}=useRepayNftList(address);

    const handlePrintBorrowListFilter=()=>{
        return borrowList?.filter(item=>{
            const nftState=item.status;
            return(
                nftState
            );
        })
    };
    return {handlePrintBorrowListFilter};

}
export default useBorrowNftListFilter;