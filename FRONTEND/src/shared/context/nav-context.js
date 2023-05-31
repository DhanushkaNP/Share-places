import { createContext } from "react";

export const NavContext = createContext({
  isNavigationOn: true,
  setNav: () => {},
});
