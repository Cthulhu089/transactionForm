import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import "./CustomButton.css"
const CustomButton = ({
  className,
  label,
  type,
  block,
  onClick,
  shape,
  size,
  disabled,
  ghost
}) => {
  return (
    <Button
      className={className}
      type={type}
      block={block}
      onClick={() => {
        return onClick();
      }}
      disabled={disabled}
      shape={shape}
      size={size}
      ghost={ghost}
    >
      {label}
    </Button>
  );
};

CustomButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  block: PropTypes.bool
};

CustomButton.defaultProps = {
  disabled: false,
  type: "primary",
  ghost: false,
}

export default CustomButton;
