import useSWR from "swr";
import { nextonFetcher } from "@/api/axios";

export interface ITokenRate{
    tonToNextonRate:number;
    nxtonToTonRate:number;
}

export const useTokenRate=()=>{
    const swrKey =`/data/getTokenRate`;
    return useSWR<ITokenRate>(swrKey, nextonFetcher);
}