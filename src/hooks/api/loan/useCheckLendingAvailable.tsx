import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";
import { boolean } from "zod";

interface ICheckLendingAvailable{
    succes:boolean;
    message:string;
}

export const useCheckLendingAvailable=(address:string,nftId:number)=>{
    const {data,isLoading,error}=useSWR<ICheckLendingAvailable>(
        `/data/checkLendingAvailability?address=${address}&nftId=${nftId}`,
        nextonFetcher,
        {
            errorRetryCount:3,
        },
    );
    return{
        data,
        isLoading,
        isError:boolean(error),
    }
}