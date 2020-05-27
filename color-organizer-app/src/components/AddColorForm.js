import React from "react";
import useInput from "../hooks/useInput";
import { useColors } from "../context/ColorProvider";

const AddColorForm = () => {
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("");
  const { addColor } = useColors();

  const submit = (event) => {
    event.preventDefault();
    addColor(titleProps.value, colorProps.value);
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

export default AddColorForm;
