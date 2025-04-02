import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardDetail from "@/pages/Dashboard/DashboardDetail";
import BorrowDetails from "@/pages/Loan/Borrow/BorrowDetails";
import BorrowRiskDisclosure from "@/pages/Loan/Borrow/BorrowRiskDisclosure";
import BorrowVerify from "@/pages/Loan/Borrow/BorrowVerify";
import LoanHistory from "@/pages/Loan/History/LoanHistory";
import LoanHistoryDetails from "@/pages/Loan/History/LoanHistoryDetails";
import Loan from "@/pages/Loan/Loan";
import RepaymentDetails from "@/pages/Loan/Repay/RepaymentDetails";
import RiskDisclosure from "@/pages/Loan/RiskDisclosure";
import Main from "@/pages/Main/Main";
import Menu from "@/pages/Menu/Menu";
import MyAsset from "@/pages/MyAsset/MyAsset";
import NFTDetail from "@/pages/MyAsset/NFTDetail/NFTDetail";
import NftList from "@/pages/MyAsset/NftList";
import UnstakedList from "@/pages/MyAsset/UnstakedList";
import Nlp from "@/pages/Nlp/Nlp";
import Referral from "@/pages/Referral/Referral";
import Amount from "@/pages/Stake/Amount";
import Leverage from "@/pages/Stake/Leverage";
import NFTPreview from "@/pages/Stake/NFTPreview";
import NominatorList from "@/pages/Stake/NominatorList";
import Swap from "@/pages/Swap/Swap";
import UnstakingBetaInfo from "@/pages/Unstaking/UnstakingBetaInfo";
import UnstakingNftDetail from "@/pages/Unstaking/UnstakingNftDetail";
import StakeSuccess from "@/pages/Stake/StakeSuccess";
import SplashScreen from "@/pages/Splash/splash";
import ScrollToTop from "./ScrollTo";
import Onboarding from "@/pages/Onboarding/Onboarding";
import TokenExchange from "@/pages/TokenExchange/TokenExchange";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/exchange" element={<TokenExchange />} />
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/main" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/dashboard">
          <Route path="" element={<Dashboard />} />
          <Route path="detail/:strategy" element={<DashboardDetail />} />
        </Route>
        <Route path="/stake">
          <Route path="amount" element={<Amount />} />
          <Route path="leverage" element={<Leverage />} />
          <Route path="nominator" element={<NominatorList />} />
          <Route path="preview" element={<NFTPreview />} />
          <Route path="success" element={<StakeSuccess />} />
        </Route>
        {/* // ! Paths under /loan are disabled until contract & API are ready */}
        <Route path="/loan">
          <Route path="" element={<Loan />} />
          <Route path="risk-disclosure" element={<RiskDisclosure />} />
          <Route path=":id/borrow/details" element={<BorrowDetails />} />
          <Route path=":id/borrow/risk-disclosure" element={<BorrowRiskDisclosure />} />
          <Route path=":id/borrow/verify" element={<BorrowVerify />} />
          <Route path=":id/repay/details" element={<RepaymentDetails />} />
          <Route path="history" element={<LoanHistory />} />
          <Route path=":id/history/details" element={<LoanHistoryDetails />} />
        </Route>
        <Route path="/myasset" element={<MyAsset />}>
          <Route path="nftlist" element={<NftList />} />
          <Route path="unstaked" element={<UnstakedList />} />
        </Route>
        <Route path="/myasset/:id" element={<NFTDetail />} />
        <Route path="/unstaking">
          <Route path=":id" element={<UnstakingNftDetail />} />
          <Route path=":id/view" element={<UnstakingNftDetail view />} />
          <Route path="beta" element={<UnstakingBetaInfo />} />
        </Route>
        <Route path="/swap" element={<Swap />} />
        <Route path="/nlp" element={<Nlp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
