import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const Star = ({ selected = false }) => (
  <FaStar color={selected ? "red" : "gray"} />
);
Star.propTypes = {
  selected: PropTypes.bool.isRequired,
};

const createArray = (length) => [...Array(length)];

const StarRating = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectedStars] = useState(3);
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star key={i} selected={selectedStars > i} />
      ))}
      <p>
        {selectedStars}
        of
        {totalStars}
        stars
      </p>
    </>
  );
};
StarRating.propTypes = {
  totalStars: PropTypes.number.isRequired,
};

export default StarRating;
