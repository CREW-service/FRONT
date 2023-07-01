import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home";
import Boat from "Pages/Boat";
import Writing from "Pages/Writing";
import MyPage from "Pages/MyPage";
import Signin from "Pages/Signin";
import CorrectionWriting from "Pages/CorrectionWriting";
import Onboarding from "Pages/Onboarding";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/boat/:id" element={<Boat />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/correctionwriting" element={<CorrectionWriting />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main" element={<Home />} />
      </Routes>
    </BrowserRouter>

  );
}

export default Router;
