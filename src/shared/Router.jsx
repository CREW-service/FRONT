import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home";
import Boat from "Pages/Boat";
import Writing from "Pages/Writing";
import MyPage from "Pages/MyPage";
import Signin from "Pages/Signin";
import CorrectionWriting from "Pages/CorrectionWriting";
import Onboarding from "Pages/Onboarding";
import Profile from "Pages/Profile";
import Layout from "Components/Layout/Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Onboarding />} />
        <Route path="/" element={<Layout />}>
          <Route path="/boat/:id" element={<Boat />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/correctionwriting" element={<CorrectionWriting />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/main" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
