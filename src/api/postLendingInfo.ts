import { client } from "./axios";

interface postLendingInfoProps{
    telegramId:number,
    address:string,
    amount:string,
    nftId:number,
}

export const postLendingInfo=async(lendingInfo:postLendingInfoProps)=>{
    try{
        const data=await client.post("/data/lending",lendingInfo);
        return data.status;
    }catch(e){
        console.error(e)
    }
};