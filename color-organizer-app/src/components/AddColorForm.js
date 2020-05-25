import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

const AddColorForm = ({ onNewColor }) => {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("");

  const submit = (event) => {
    event.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input {...colorProps} type="color" required />
      <button type="submit">ADD</button>
    </form>
  );
};
AddColorForm.defaultProps = {
  onNewColor: (f) => f,
};
AddColorForm.propTypes = {
  onNewColor: PropTypes.func,
};

export default AddColorForm;
