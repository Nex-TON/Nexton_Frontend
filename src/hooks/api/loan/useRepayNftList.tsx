import useSWR from "swr";
import {borrowNftInfo} from "@/types/ReapyNftList";
import { nextonFetcher } from "@/api/axios";
import { boolean } from "zod";

export const useRepayNftList=(address:string)=>{
    const {data,isLoading,error}=useSWR<borrowNftInfo[]>(
        `/data/lendingList?address=${address}`,
        nextonFetcher,
        {
            errorRetryCount:3,
        },
    );
    return{
        borrowList:data,
        isLoading,
        isError:boolean(error),
    }
}