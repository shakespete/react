import React from "react";
import PropTypes from "prop-types";
import StarRating from "./StarRating";

const Color = ({ title, color, rating }) => {
  return (
    <section>
      <h1>{title}</h1>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating selectedStars={rating} />
    </section>
  );
};
Color.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Color;
