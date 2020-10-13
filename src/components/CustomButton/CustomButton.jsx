import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

const CustomButton = ({
  className,
  label,
  type,
  block,
  onClick,
  shape,
  size,
  disabled
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
}

export default CustomButton;
