import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import React from "react";

function MainNavigation(props) {
  return (
    <React.Fragment>
      <SideDrawer>
        <nav className="main-navigation-drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation-menu-btn">
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navigation-title">
          <Link to="/">SharePlaces</Link>
        </h1>

        <nav className="main-navigation-header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
