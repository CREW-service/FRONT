import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

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
