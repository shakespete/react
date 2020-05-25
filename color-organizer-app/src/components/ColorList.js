import React from "react";
import PropTypes from "prop-types";
import Color from "./Color";

const ColorList = ({ colors, onRemoveColor, onRateColor }) => {
  return (
    <div>
      {colors.length === 0 ? (
        <p>No Colors Listed. (Add a Color)</p>
      ) : (
        colors.map((color) => (
          <Color
            key={color.id}
            {...color}
            onRemove={onRemoveColor}
            onRate={onRateColor}
          />
        ))
      )}
    </div>
  );
};

ColorList.defaultProps = {
  colors: [],
  onRemoveColor: (f) => f,
  onRateColor: (f) => f,
};
const ColorShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
});
ColorList.propTypes = {
  colors: PropTypes.arrayOf(ColorShape),
  onRemoveColor: PropTypes.func,
  onRateColor: PropTypes.func,
};

export default ColorList;
