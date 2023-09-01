import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/Main";
import Leverage from "../../pages/Leverage";
import Nlp from "../../pages/Nlp";
import MyAsset from "../../pages/MyAsset";
import Loan from "../../pages/Loan";
import BorrowDetail from "../loan/borrow/BorrowDetail";
import Swap from "../../pages/Swap";
import StakingNftDetail from "../../pages/StakingNftDetail";
import UnstakingNftDetail from "../../pages/UnstakingNftDetail";
import NFTPreview from "../lerverage/NFTPreview/NFTPreview";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/leverage" element={<Leverage />} />
        <Route path="/leverage/preview" element={<NFTPreview />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/loan/:id" element={<BorrowDetail />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/nlp" element={<Nlp />} />
        <Route path="/myasset" element={<MyAsset />} />
        <Route path="/myasset/:id" element={<StakingNftDetail />} />
        <Route path="/unstaking/:id" element={<UnstakingNftDetail />} />
        <Route path="/unstaking/view/:id" element={<UnstakingNftDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
