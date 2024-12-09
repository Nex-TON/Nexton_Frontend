import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";

export interface IloanInfo{
    nxTonAmount:number;
    principal:number;
    loanToValue:number;
    loanId:number,
}

export const useLoanDetail=(nftId:number,address:string,phase:string)=>{
    const swrKey=nftId?`/data/loanDetail?nftId=${nftId}&address=${address}&phase=${phase}`:null;
    
    return useSWR<IloanInfo>(swrKey, nextonFetcher);

}