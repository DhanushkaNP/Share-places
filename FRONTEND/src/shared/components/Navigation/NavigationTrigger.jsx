import { useContext } from "react";
import { NavContext } from "../../context/nav-context";

export default function NavigationTrigger() {
  const nav = useContext(NavContext);
  nav.setNav(true);

  return null;
}
