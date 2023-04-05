import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`;
  script.defer = true;
  script.async = true;

  document.head.appendChild(script);
}

loadGoogleMapsScript();
const root = createRoot(document.getElementById("root"));
root.render(<App />);
