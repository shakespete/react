import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

/**
 * The default value for this function is f => f. This is simply a fake
 * function that does nothing. It just returns whatever argument was sent
 * to it. However, if we do not set a default function, and the onSelect
 * property is not defined, an error will occur when we click the FaStar
 * component because the value for onSelect must be a function. Even though
 * f => f does nothing, it is a function, which means it can be invoked
 * without causing errors. If an onSelect property is not defined, no problem.
 * React will simply invoke the fake function and nothing will happen.
 */

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <FaStar color={selected ? "red" : "gray"} onClick={onSelect} />
);
Star.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const createArray = (length) => [...Array(length)];

const StarRating = ({ totalStars, selectedStars, onRate }) => {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={Symbol(i).toString()}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
};
StarRating.defaultProps = {
  totalStars: 5,
  selectedStars: 0,
  onRate: (f) => f,
};
StarRating.propTypes = {
  totalStars: PropTypes.number,
  selectedStars: PropTypes.number,
  onRate: PropTypes.func,
};

export default StarRating;
