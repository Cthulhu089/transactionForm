import React from "react";
import TextField from "@material-ui/core/TextField";
import './CustomInput.css';

const CustomInput = ({ id, label, onChange, value, disabled, className, InputProps, error }) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      disabled={disabled}
      className={className}
      InputLabelProps={{
        shrink: true,
      }}
      error={error}
      InputProps={InputProps}
      onChange={(e) => {
        return onChange(e.target.value);
      }}
    />
  );
};

export default CustomInput;
