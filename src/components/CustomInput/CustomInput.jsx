import React from "react";
import TextField from "@material-ui/core/TextField";

const CustomInput = ({ id, label, onChange, value, disabled }) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        return onChange(e.target.value);
      }}
    />
  );
};

export default CustomInput;
