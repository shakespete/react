import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import colorData from "../color-data.json";

const ColorContext = createContext();
export const useColors = () => useContext(ColorContext);

export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState(colorData);

  const addColor = (title, color) =>
    setColors([
      ...colors,
      {
        id: uuid(),
        rating: 0,
        title,
        color,
      },
    ]);

  const rateColor = (id, rating) =>
    setColors(
      colors.map((color) => (color.id === id ? { ...color, rating } : color))
    );

  const removeColor = (id) =>
    setColors(colors.filter((color) => color.id !== id));

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorContext.Provider>
  );
};
ColorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
