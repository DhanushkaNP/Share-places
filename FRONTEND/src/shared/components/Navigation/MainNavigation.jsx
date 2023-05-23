import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
// import "./MainNavigation.css";
import React, { useState } from "react";

function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function openDrawer() {
    setDrawerIsOpen(true);
  }

  function closeDrawer() {
    setDrawerIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

      <SideDrawer show={drawerIsOpen}>
        <nav className="h-full">
          <NavLinks onClick={closeDrawer} />
        </nav>
      </SideDrawer>

      <MainHeader>
        <div className="flex flex-col justify-center h-20 lg:hidden">
          <button className="btn-nav group" onClick={openDrawer}>
            <span className="nav-span" />
            <span className="nav-span" />
            <span className="nav-span" />
          </button>
        </div>
        <h1 className="font-title text-3xl	text-primary my-auto ml-5 lg:ml-14 flex-5 z-20">
          <Link to="/">Share Places</Link>
        </h1>

        <nav className="my-auto absolute h-20 w-full lg:flex items-center justify-center hidden ">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
