import React, { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SuiInput
import SuiInputRoot from "components/Sui/SuiInput/SuiInputRoot";
import SuiInputWithIconRoot from "components/Sui/SuiInput/SuiInputWithIconRoot";
import SuiInputIconBoxRoot from "components/Sui/SuiInput/SuiInputIconBoxRoot";
import SuiInputIconRoot from "components/Sui/SuiInput/SuiInputIconRoot";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController } from "context";

const SuiInput = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;
  const [controller] = useSoftUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <SuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SuiInputIconBoxRoot ownerState={{ size }}>
          <SuiInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SuiInputIconRoot>
        </SuiInputIconBoxRoot>
        <SuiInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
      </SuiInputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <SuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <SuiInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
        <SuiInputIconBoxRoot ownerState={{ size }}>
          <SuiInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </SuiInputIconRoot>
        </SuiInputIconBoxRoot>
      </SuiInputWithIconRoot>
    );
  } else {
    template = <SuiInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />;
  }

  return template;
});

// Setting default values for the props of SuiInput
SuiInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the SuiInput
SuiInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SuiInput;
