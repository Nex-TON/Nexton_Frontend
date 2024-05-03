export interface Referral {
  _id: string;
  userId: string;
  referrerId: string;
  referralLink: string;
  __v: number;
}

export interface ReferralStatus {
  totalReferrals: number;
  totalRewards: number;
  referralDetails: Referral[];
}
