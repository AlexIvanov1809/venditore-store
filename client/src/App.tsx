import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AppLoader from "./hooks/AppLoader/AppLoader";
import { Footer, Header, Main, MarketPlace, AdminPanel } from "./layouts/";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLoader>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/market/:store" element={<MarketPlace />} />
            <Route path="/adminPanel/:store" element={<AdminPanel />} />
          </Routes>
          <Footer />
        </AppLoader>
      </BrowserRouter>
    </>
  );
}

export default App;
