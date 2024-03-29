import React, { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SuiButton
import SuiButtonRoot from "components/Sui/SuiButton/SuiButtonRoot";

const SuiButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <SuiButtonRoot
      {...rest}
      ref={ref}
      color="primary"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </SuiButtonRoot>
  )
);

// Setting default values for the props of SuiButton
SuiButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the SuiButton
SuiButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SuiButton;
