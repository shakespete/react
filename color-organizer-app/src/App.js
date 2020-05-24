import React, { useState } from "react";
import colorData from "./color-data.json";
import ColorList from "./components/ColorList";

function App() {
  console.log(colorData);
  const [colors, setColors] = useState(colorData);
  return <ColorList colors={colors} />;
}

export default App;
