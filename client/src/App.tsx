import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AppLoader from "./hooks/AppLoader/AppLoader";
import { Footer, Header, Main, MarketPlace, AdminPanel } from "./layouts/";
import CreateCoffeeItem from "./pages/AdminPanel/CreateCoffeeItem/CreateCoffeeItem";
import CreateTeaItem from "./pages/AdminPanel/CreateTeaItem/CreateTeaItem";

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
            <Route
              path="/adminPanel/coffee/create"
              element={<CreateCoffeeItem />}
            />
            <Route path="/adminPanel/tea/create" element={<CreateTeaItem />} />
          </Routes>
          <Footer />
        </AppLoader>
      </BrowserRouter>
    </>
  );
}

export default App;
