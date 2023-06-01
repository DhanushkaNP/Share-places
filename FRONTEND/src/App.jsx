import React, { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { NavContext } from "./shared/context/nav-context";
import useNav from "./shared/hooks/nav-hook";
import useAuth from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import AllPlaces from "./places/pages/AllPlaces";
import Home from "./Home/pages/Home";

const NewPlace = lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const Auth = lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();
  const [isNavigationOn, setNav] = useNav();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<AllPlaces logged />} />
        <Route path="/users" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Users />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<AllPlaces />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <NavContext.Provider
        value={{ isNavigationOn: isNavigationOn, setNav: setNav }}
      >
        <BrowserRouter>
          <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Routes>{routes}</Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </NavContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
