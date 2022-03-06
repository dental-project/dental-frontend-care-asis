import { fontWeight } from "@mui/system";

/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
function collapseItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav } = ownerState;

  const { dark, white, text, transparent } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: active && transparentSidenav ? white.main : transparent.main,
    color: active ? dark.main : text.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && transparentSidenav ? xxl : "none",
    [breakpoints.up("xl")]: {
      boxShadow: () => {
        if (active) {
          return transparentSidenav ? xxl : "none";
        }

        return "none";
      },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, color } = ownerState;

  const { white, info, light, gradients } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: () => {
      if (active) {
        return color === "default" ? info.main : palette[color].main;
      }

      return light.main;
    },
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.md,
    display: "grid",
    placeItems: "center",
    boxShadow: md,
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up("xl")]: {
      background: () => {
        let background;

        if (!active) {
          background = transparentSidenav ? white.main : light.main;
        } else if (color === "default") {
          background = info.main;
        } else if (color === "warning") {
          background = gradients.warning.main;
        } else {
          background = palette[color].main;
        }

        return background;
      },
    },

    "& svg, svg g": {
      fill: active ? white.main : gradients.dark.state,
    },
  };
}

const collapseIcon = ({ palette: { white, gradients } }, { active }) => ({
  color: active ? white.main : gradients.dark.state,
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, transparentSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(12.8),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
      marginLeft: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

function dropdownItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav } = ownerState;

  const { dark, white, text, transparent } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: active && transparentSidenav ? white.main : transparent.main,
    color: active ? dark.main : text.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(1)} ${pxToRem(12.8)} ${pxToRem(1)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(40)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && transparentSidenav ? xxl : "none",
    [breakpoints.up("xl")]: {
      boxShadow: () => {
        if (active) {
          return transparentSidenav ? xxl : "none";
        }

        return "none";
      },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

function dropdownIcon(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { subactive, transparentSidenav, color } = ownerState;
  const { white, info, light, gradients } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: () => {
      // if (subactive) {
      //   return color === "default" ? info.main : palette[color].main;
      // }

      return light.main;
    },
    minWidth:0,
    fontSize: () => {
      if (subactive) return pxToRem(10)
      else return pxToRem(7)
    },
    color: () => {
      if (subactive) return "rgb(52, 71, 103)"
      else return "rgba(77, 86, 148, 0.7)"
      
    }
  }
}

function dropdownText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, transparentSidenav, subactive } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;
  
  return {
    // marginLeft: pxToRem(12.8),
    padding: `${pxToRem(15)} 0`,
    [breakpoints.up("xl")]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
      marginLeft: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: subactive ? fontWeightMedium : fontWeightRegular,
      fontSize: subactive ? pxToRem(16) : size.sm,
      lineHeight: 0,
      color: subactive ? "rgb(52, 71, 103)" : "rgba(77, 86, 148, 0.7)"
    },
  };
}
export { collapseItem, collapseIconBox, collapseIcon, collapseText, dropdownItem, dropdownIcon, dropdownText };
