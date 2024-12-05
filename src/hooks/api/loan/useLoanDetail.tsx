import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";

export interface IloanInfo{
    nxTonAmount:number;
    principal:number;
    loanToValue:number;
}

export const useLoanDetail=(nftId:number)=>{
    const swrKey=nftId?`/data/loanDetail?nftId==${nftId}`:null;
    
    return useSWR<IloanInfo[]>(swrKey, nextonFetcher);

}