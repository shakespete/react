import React from "react";
import { render } from "react-dom";
import App from "./App";
import { ColorProvider } from "./context/ColorProvider";

render(
  <ColorProvider>
    <App />
  </ColorProvider>,
  document.getElementById("root")
);
