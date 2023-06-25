import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home";
import Boat from "Pages/Boat";
import Writing from "Pages/Writing";
import MyPage from "Pages/MyPage";
import Signin from "Pages/Signin";
import Alarm from "Pages/Alarm";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boat/:id" element={<Boat />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/alarm" element={<Alarm />} />
        {/* <Route path="/job" element={<PostList />} />
        
        <Route path="/job/:job_id" element={<Detailpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/oauth" element={<Signin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
