import { BrowserRouter, Route, Routes } from "react-router-dom";

import BorrowDetail from "../../pages/Loan/BorrowDetail";
import Loan from "../../pages/Loan/Loan";
import Main from "../../pages/Main/Main";
import Menu from "../../pages/Menu/Menu";
import MyAsset from "../../pages/MyAsset/MyAsset";
import NftList from "../../pages/MyAsset/NftList";
import StakingNftDetail from "../../pages/MyAsset/StakingNftDetail";
import UnstakingDetail from "../../pages/MyAsset/UnstakingDetail";
import UnstakingList from "../../pages/MyAsset/UnstakingList";
import Nlp from "../../pages/Nlp/Nlp";
import Amount from "../../pages/Stake/Amount";
import Leverage from "../../pages/Stake/Leverage";
import NFTPreview from "../../pages/Stake/NFTPreview";
import NominatorList from "../../pages/Stake/NominatorList";
import Swap from "../../pages/Swap/Swap";
import UnstakingBetaInfo from "../../pages/Unstaking/UnstakingBetaInfo";
import UnstakingNftDetail from "../../pages/Unstaking/UnstakingNftDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
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
        <Route path="/unstaking/beta" element={<UnstakingBetaInfo />} />
        <Route path="/unstaking/view/:id" element={<UnstakingNftDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
