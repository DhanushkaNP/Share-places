import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./user/pages/Users";

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

    script.async = true;

    document.head.appendChild(script);
  }, []);

  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
