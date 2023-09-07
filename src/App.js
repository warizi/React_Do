import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
