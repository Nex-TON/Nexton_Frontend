interface ReferredUser {
  _id: string;
  userId: string;
  referrerId: string;
  referralLink: string;
  createdAt: string;
  username: string;
  __v: number;
}
export interface Referral {
  createdAt: string;
  users: ReferredUser[];
}

export interface ReferralStatus {
  totalReferrals: number;
  referralDetails: Referral[];
}
