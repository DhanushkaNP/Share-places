import { useContext, useEffect } from "react";
import { NavContext } from "../../context/nav-context";

export default function NavigationTrigger() {
  const nav = useContext(NavContext);
  useEffect(() => {
    nav.setNav(true);
  }, [nav]);

  return null;
}
