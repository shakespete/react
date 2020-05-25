import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";

const Color = ({
  id,
  title,
  color,
  rating,
  onRemove = (f) => f,
  onRate = (f) => f,
}) => {
  return (
    <section>
      <h1>{title}</h1>
      <button type="button" onClick={() => onRemove(id)}>
        <FaTrash color="red" />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={rating}
        onRate={(rating) => onRate(id, rating)}
      />
    </section>
  );
};
Color.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
};

export default Color;
