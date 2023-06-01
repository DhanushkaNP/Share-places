import { useState, useCallback } from "react";

function useNav() {
  const [isNavigationOn, setNavigationOn] = useState(true);

  const setNav = useCallback((toggle) => {
    if (toggle === false) {
      setNavigationOn(false);
    } else if (toggle === true) {
      setNavigationOn(true);
    }
  }, []);

  return [isNavigationOn, setNav];
}

export default useNav;
