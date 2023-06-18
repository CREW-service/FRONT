import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Router from "./shared/Router";


function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
