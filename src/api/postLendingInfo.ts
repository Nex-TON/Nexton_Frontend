import { client } from "./axios";

interface postLendingInfoProps{
    telegramId:number,
    nftId:number,
    address:string,
}

export const postLendingInfo=async(lendingInfo:postLendingInfoProps)=>{
    try{
        const data=await client.post("data/lending",lendingInfo);
        return data.status;
    }catch(e){
        console.error(e)
    }
};