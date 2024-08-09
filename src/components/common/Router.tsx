import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard/Dashboard";
import BorrowDetails from "@/pages/Loan/Borrow/BorrowDetails";
import BorrowRiskDisclosure from "@/pages/Loan/Borrow/BorrowRiskDisclosure";
import BorrowVerify from "@/pages/Loan/Borrow/BorrowVerify";
import NFTDetail from "@/pages/Loan/Borrow/NFTDetail";
import LoanHistory from "@/pages/Loan/History/LoanHistory";
import LoanHistoryDetails from "@/pages/Loan/History/LoanHistoryDetails";
import Loan from "@/pages/Loan/Loan";
import RepaymentDetails from "@/pages/Loan/Repay/RepaymentDetails";
import RiskDisclosure from "@/pages/Loan/RiskDisclosure";
import Main from "@/pages/Main/Main";
import Menu from "@/pages/Menu/Menu";
import MyAsset from "@/pages/MyAsset/MyAsset";
import NftList from "@/pages/MyAsset/NftList";
import StakingNftDetail from "@/pages/MyAsset/StakingNftDetail";
import UnstakingDetail from "@/pages/MyAsset/UnstakingDetail";
import UnstakingList from "@/pages/MyAsset/UnstakingList";
import Nlp from "@/pages/Nlp/Nlp";
import Referral from "@/pages/Referral/Referral";
import Amount from "@/pages/Stake/Amount";
import Leverage from "@/pages/Stake/Leverage";
import NFTPreview from "@/pages/Stake/NFTPreview";
import NominatorList from "@/pages/Stake/NominatorList";
import Swap from "@/pages/Swap/Swap";
import UnstakingBetaInfo from "@/pages/Unstaking/UnstakingBetaInfo";
import UnstakingNftDetail from "@/pages/Unstaking/UnstakingNftDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stake/amount" element={<Amount />} />
        <Route path="/stake/leverage" element={<Leverage />} />
        <Route path="/stake/nominator" element={<NominatorList />} />
        <Route path="/stake/preview" element={<NFTPreview />} />
        <Route path="/loan">
          <Route path="" element={<Loan />} />
          <Route path="risk-disclosure" element={<RiskDisclosure />} />
          <Route path=":id" element={<NFTDetail />} />
          <Route path=":id/borrow/details" element={<BorrowDetails />} />
          <Route path=":id/borrow/risk-disclosure" element={<BorrowRiskDisclosure />} />
          <Route path=":id/borrow/verify" element={<BorrowVerify />} />
          <Route path=":id/repay/details" element={<RepaymentDetails />} />
          <Route path="history" element={<LoanHistory />} />
          <Route path=":id/history/details" element={<LoanHistoryDetails />} />
        </Route>
        <Route path="/swap" element={<Swap />} />
        <Route path="/nlp" element={<Nlp />} />
        <Route path="/myasset" element={<MyAsset />}>
          <Route path="nftlist" element={<NftList />} />
          <Route path="unstaking" element={<UnstakingList />} />
          <Route path="unstakingdetail" element={<UnstakingDetail />} />
        </Route>
        <Route path="/myasset/:id" element={<StakingNftDetail />} />
        <Route path="/unstaking/:id" element={<UnstakingNftDetail />} />
        <Route path="/unstaking/beta" element={<UnstakingBetaInfo />} />
        <Route path="/unstaking/view/:id" element={<UnstakingNftDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
