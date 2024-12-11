import { nextonFetcher } from "@/api/axios";
import useSWR from "swr";

export interface IvalidateLending{
    valid:boolean;
    reason:string;
}

export const useValidateLending=(nftId:number)=>{
    const swrKey=nftId?`/data/validate-lending?nftId=${nftId}`:null;
    
    return useSWR<IvalidateLending>(swrKey, nextonFetcher);

}