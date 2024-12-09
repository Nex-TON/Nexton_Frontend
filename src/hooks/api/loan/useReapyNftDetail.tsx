import { nextonFetcher } from "@/api/axios";
import { borrowNftInfo } from "@/types/ReapyNftList";
import useSWR from "swr";

export const useRepayNftDetail=(nftId:number)=>{
    const {data,isLoading,error}=useSWR<borrowNftInfo[]>(
        `/data/getLendingInfoByNftId?nftId=${nftId}`,
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