import { client } from "./axios";

export interface postLendingInfoProps{
    telegramId:number,
    address:string,
    amount:string,
    nftId:number,

}

export const postLendingInfo=async(lendingInfo:postLendingInfoProps)=>{
    try{
        const response=await client.post("data/lending",lendingInfo);
        return response.status;
    }catch(e){
        console.error(e)
    }
};