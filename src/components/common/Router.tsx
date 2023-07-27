import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/Main";
import Leverage from "../../pages/Leverage";
import Nlp from "../../pages/Nlp";
import MyAsset from "../../pages/MyAsset";
import MyAssetDetail from "../../pages/MyAssetDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/leverage" element={<Leverage />} />
        <Route path="/nlp" element={<Nlp />} />
        <Route path="/myasset" element={<MyAsset />} />
        <Route path="/myasset/:id" element={<MyAssetDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
