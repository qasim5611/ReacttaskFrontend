import React, { Suspense, lazy } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

// Lazy load components
const UserCreate = lazy(() => import("./components/User/UserCreate"));
const UserShow = lazy(() => import("./components/User/UserShow"));
const UserEdit = lazy(() => import("./components/User/UserEdit"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UserShow />} />
          <Route path="/userCreate" element={<UserCreate />} />
          <Route path="/userEdit/:id" element={<UserEdit />} />
        </Routes>
      </Suspense>

      {/* <Footer /> */}
    </>
  );
}

export default App;
