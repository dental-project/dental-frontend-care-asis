import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import toothImg from "assets/img/toothImg.svg";

// # NEW
// Soft UI Dashboard PRO React components
import SuiBox from "components/Sui/SuiBox";
import Icon from "@mui/material/Icon";
import Sidenav from "components/Sidenav";
import Configurator from "components/Configurator";
import Navbar from "components/Navbars";
// Soft UI Dashboard PRO React contexts

import {
  useSoftUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";


// # NEW

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/dental") {
        if (prop.subItem) {
          let subRoutes = new Object();
          subRoutes = prop.subItem.map((subProp,subKey)=>{
            return <Route
              path={subProp.layout + subProp.path}
              component={subProp.component}
              key={subKey}
              color={"#000"}
            />
          });
          subRoutes.push(<Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            color={"#000"}
            subItem={prop.subItem}
          />);
          return subRoutes
        } else {
          
          return <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            color={"#000"}
          />
        }
      } 
      return null;
    })}
    <Redirect from="/dental" to="/dental/receptionRegister" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // # NEW

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const [onMouseEnter, setOnMouseEnter] = React.useState(false);
  const [controller, dispatch] = useSoftUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
  } = controller;
  const { pathname } = useLocation();

  // Setting the dir attribute for the body element

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  React.useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // # NEW

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(toothImg);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/dental/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  return (
    <div className={classes.wrapper}>
      <>
        
        <Sidenav
          color={sidenavColor}
          brand={toothImg}
          brandName="Soft UI Dashboard"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
        {/* {configsButton} */}
      </>
      <div className={classes.mainPanel} ref={mainPanel}>
      
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
            <Navbar />
              {switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
      </div>
    </div>
  );
}
