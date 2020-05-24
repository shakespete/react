import React from "react";
import PropTypes from "prop-types";
import Color from "./Color";

const ColorList = ({ colors }) => {
  return (
    <div>
      {colors.length === 0 ? (
        <p>No Colors Listed. (Add a Color)</p>
      ) : (
        colors.map((color) => <Color key={color.id} {...color} />)
      )}
    </div>
  );
};

ColorList.defaultProps = {
  colors: [],
};
const ColorShape = PropTypes.shape({
  title: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
});
ColorList.propTypes = {
  colors: PropTypes.arrayOf(ColorShape),
};

export default ColorList;
