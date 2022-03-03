import React from "react";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/Sui/SuiBox";

// Custom styles for the SidenavDropdown
import {
  collapseItem,
  dropdownItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "components/Sidenav/styles/sidenavDropdown";

// Soft UI Dashboard PRO React context
import { useSoftUIController } from "context";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { NavLink } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

import SidenavCollapse from "components/Sidenav/SidenavCollapse";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

// function SidenavDropdown({ color, icon, name, children, active, noCollapse, open, subItem, ...rest }) {
function SidenavDropdown({ color, icon, name, children, active, noCollapse,  subItem, ...rest }) {  
  const [controller] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };


  const SubItemOff = () => (
    <>
      <ListItem button onClick={handleClick}>
        <SuiBox
          {...rest}
          sx={theme => collapseItem(theme, { active, transparentSidenav })}
        >
          <ListItemIcon
            sx={theme => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {typeof icon === "string"
              ? // <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
              { icon }
              : icon}
          </ListItemIcon>
          <ListItemText
            primary={name}
            sx={theme => collapseText(theme, { miniSidenav, transparentSidenav, active })} />
          {open ? (
            <ExpandLess style={{ color: "#000" }} />
          ) : (
            <ExpandMore style={{ color: "#000" }} />
          )}
        </SuiBox>
      </ListItem>
      {subItem.map(({layout, path, color, key, name, icon, collapseName}) => {
          return (
            // <SidenavCollapse
            //   color={color}
            //   key={key}
            //   name={name}
            //   icon={icon}
            //   active={key === collapseName}
            // />
            <NavLink to={layout + path} key={key}>
              {/* <Collapse in={open} timeout="auto" unmountOnExit style={{ paddingLeft: "45px" }}>  */}
              <Collapse in={open} timeout="auto" unmountOnExit> 
                <List>
                  <ListItem button className={classes.nested} >
                  <SuiBox
                    {...rest}
                    sx={theme => dropdownItem(theme, { active, transparentSidenav })}
                  >
                      <ListItemIcon >
                        {typeof icon === "string"
                          ? // <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
                            icon
                          : icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={name}
                        sx={theme => collapseText(theme, { miniSidenav, transparentSidenav, active })} />
                  </SuiBox>
                  </ListItem>
                </List>
              </Collapse>
          </NavLink>
          );
        })}
      {/* <NavLink to={"/dental/partRegister"} key={key}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ marginLeft: "20px" }}>
              <ListItem button className={classes.nested}>
                <ListItemIcon style={{ color: "#000" }}>
                  <StarBorder style={{ color: "#000" }} />
                </ListItemIcon>
                <ListItemText primary="파트등록" style={{ color: "#000" }} />
              </ListItem>
            </List>
          </Collapse>
      </NavLink> */}

    </>
  );

  return (
    <>
      <SubItemOff />
    </>
  );
}

// Setting default values for the props of SidenavDropdown
SidenavDropdown.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavDropdown
SidenavDropdown.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavDropdown;
