export interface borrowInfo{
    borrowInfos:borrowNftInfo[];
}
export interface borrowNftInfo{
    nftId:number;// NFT의 고유 ID
    principal: number;// 대출 원금
    repayAmount:number;// 현재 시간 기준 상환 금액
    interestRate:number;// 이자율
    loanToValue:number;// LTV
    timeStamp:string;// 대출 날짜
    status:number;// 대출 상태, 0은 unpaid 1은 paid off
}