import { nextonFetcher } from "@/api/axios";
import { borrowNftInfo } from "@/types/ReapyNftList";
import useSWR from "swr";

export const useRepayNftDetail=(loanId:number,address:string)=>{
    const {data,isLoading,error}=useSWR<borrowNftInfo>(
        `/data/getLendingInfoByLoanId?loanId=${loanId}&address=${address}`,
        nextonFetcher,
        {
            errorRetryCount:3,
        },
    );
    return{
        data,
        isLoading,
        error,
    }
    

}