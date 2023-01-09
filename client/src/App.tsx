import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Footer, Header, Main, MarketPlace } from "./layouts/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/market/:store" element={<MarketPlace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
