/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";


import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  let location = useLocation();


  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };





  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }

  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
    
      <NavLink
        to={"/dental/dashboard"}
        //className={activePro + classes.item}
        activeClassName="active"
        key={0}
      >
        <ListItem button >
          <ListItemIcon>
            <AssignmentOutlinedIcon style={{ color: "#FFFFFF" }} />
          </ListItemIcon>
          <ListItemText primary="접수 리스트" style={{ color: "#FFFFFF" }} />
        </ListItem>
      </NavLink>
      
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <StarsIcon style={{ color: "#FFFFFF" }} />
        </ListItemIcon>
        <ListItemText primary="기초관리" style={{ color: "#FFFFFF" }} />
        {open ? <ExpandLess style={{ color: "#FFFFFF" }} /> : <ExpandMore style={{ color: "#FFFFFF" }} />}
      </ListItem>
        
      <NavLink
        to={"/dental/partRegister"}
        key={1}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{marginLeft: "20px"}}>
            <ListItem button className={classes.nested}>
              <ListItemIcon style={{ color: "#FFFFFF" }}>
                <StarBorder style={{ color: "#FFFFFF" }} />
              </ListItemIcon >
              <ListItemText primary="파트등록" style={{ color: "#FFFFFF" }} />
            </ListItem>
          </List>
        </Collapse>
      </NavLink> 

      <NavLink
        to={"/dental/itemRegister"}
        key={2}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{marginLeft: "20px"}}>
            <ListItem button className={classes.nested}>
              <ListItemIcon style={{ color: "#FFFFFF" }}>
                <StarBorder style={{ color: "#FFFFFF" }} />
              </ListItemIcon >
              <ListItemText primary="장치등록" style={{ color: "#FFFFFF" }} />
            </ListItem>
          </List>
        </Collapse>
      </NavLink>

      <NavLink
        to={"/dental/dentalRegister"}
        key={3}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{marginLeft: "20px"}}>
            <ListItem button className={classes.nested}>
              <ListItemIcon style={{ color: "#FFFFFF" }}>
                <StarBorder style={{ color: "#FFFFFF" }} />
              </ListItemIcon >
              <ListItemText primary="치과등록" style={{ color: "#FFFFFF" }} />
            </ListItem>
          </List>
        </Collapse>
      </NavLink>
       
      <NavLink
        to={"/dental/priceRegister"}
        key={4}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{marginLeft: "20px"}}>
            <ListItem button className={classes.nested}>
              <ListItemIcon style={{ color: "#FFFFFF" }}>
                <StarBorder style={{ color: "#FFFFFF" }} />
              </ListItemIcon >
              <ListItemText primary="단가등록" style={{ color: "#FFFFFF" }} />
            </ListItem>
          </List>
        </Collapse>
      </NavLink>

      <NavLink
        to={"/dental/userRegister"}
        //className={activePro + classes.item}
        activeClassName="active"
        key={5}
      >
        <ListItem button >
          <ListItemIcon>
            <PersonAddIcon style={{ color: "#FFFFFF" }} />
          </ListItemIcon>
          <ListItemText primary="유저 회원가입" style={{ color: "#FFFFFF" }} />
        </ListItem>
      </NavLink>

    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};