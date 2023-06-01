import { useContext } from "react";
import { NavContext } from "../../context/nav-context";

function MainHeader(props) {
  const nav = useContext(NavContext);
  return (
    <header
      className={`bg-secondary h-20 z-10 ${
        nav.isNavigationOn ? "flex" : "hidden"
      } flex-initial`}
    >
      {props.children}
    </header>
  );
}

export default MainHeader;
