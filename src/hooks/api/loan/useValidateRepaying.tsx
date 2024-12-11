import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";

export interface IvalidateRepaying{
    valid:boolean;
    reason:string;
}

export const useValidateRepaying=(nftId:number,address:string)=>{
    const swrKey=nftId?`/data/validate-repaying?nftId=${nftId}&address=${address}`:null;
    
    return useSWR<IvalidateRepaying>(swrKey, nextonFetcher);

}