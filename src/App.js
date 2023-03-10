import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./user/pages/Users";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
