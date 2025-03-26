import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";
import { boolean } from "zod";

export const useExchangeAmount=(address:string)=>{
    const {data,isLoading,error}=useSWR(
        `/data/getExchangedAmount?address=${address}`,
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