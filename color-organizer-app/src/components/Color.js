import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import { useColors } from "../context/ColorProvider";

const Color = ({ id, title, color, rating }) => {
  const { rateColor, removeColor } = useColors();
  return (
    <section>
      <h1>{title}</h1>
      <button type="button" onClick={() => removeColor(id)}>
        <FaTrash color="red" />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        onRate={(rating) => rateColor(id, rating)}
      />
    </section>
  );
};
Color.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Color;
