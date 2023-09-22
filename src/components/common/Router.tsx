import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/Main";
import Leverage from "../../pages/Stake/Leverage";
import Nlp from "../../pages/Nlp";

import StakingNftDetail from "../../pages/StakingNftDetail";
import UnstakingNftDetail from "../../pages/UnstakingNftDetail";
import NFTPreview from "../../pages/Stake/NFTPreview";
import NominatorList from "../../pages/Stake/NominatorList";
import NftList from "../myAsset/NFT/NftList";
import UnstakingList from "../myAsset/Unstaking/UnstakingList";
import UnstakingDetail from "../myAsset/Unstaking/UnstakingDetail/UnstakingDetail";
import Amount from "../../pages/Stake/Amount";
import Onboarding from "../../pages/Onboarding";
import Loan from "../../pages/Loan";
import BorrowDetail from "../../pages/Loan/BorrowDetail";
import Swap from "../../pages/Swap";
import MyAsset from "../../pages/MyAsset";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/main" element={<Main />} />
        <Route path="/stake/amount" element={<Amount />} />
        <Route path="/stake/leverage" element={<Leverage />} />
        <Route path="/stake/nominator" element={<NominatorList />} />
        <Route path="/stake/preview" element={<NFTPreview />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/loan/:id" element={<BorrowDetail />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/nlp" element={<Nlp />} />
        <Route path="/myasset" element={<MyAsset />}>
          <Route path="nftlist" element={<NftList />} />
          <Route path="unstaking" element={<UnstakingList />} />
          <Route path="unstakingdetail" element={<UnstakingDetail />} />
        </Route>
        <Route path="/myasset/:id" element={<StakingNftDetail />} />
        <Route path="/unstaking/:id" element={<UnstakingNftDetail />} />
        <Route path="/unstaking/view/:id" element={<UnstakingNftDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
