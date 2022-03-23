import React,{ useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiButton from "components/Sui/SuiButton";

// Soft UI Dashboard PRO React example components
import SidenavCollapse from "components/Sidenav/SidenavCollapse";
import SidenavDropdown from "components/Sidenav/SidenavDropdown";
import SidenavCard from "components/Sidenav/SidenavCard";

// Custom styles for the Sidenav
import SidenavRoot from "components/Sidenav/SidenavRoot";
import sidenavLogoLabel from "components/Sidenav/styles/sidenav";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav } from "context";

import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from '@mui/icons-material/Close';
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);



function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[1];

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };






  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, collapse, noCollapse, key, layout, path, href, subItem }) => {
    // const renderRoutes = routes.map(({ path, name, icon, component, layout}) => {
    let returnValue;
    /**
   *     type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: VirtualReality,
    noCollapse: true,

    path: "/receptionRegister",
    name: "접수 리스트",
    icon: DvrIcon,
    component: ReceptionRegister,
    layout: "/dental"
    
    { type, name, icon, title, noCollapse, key, route, href }
   */
  // console.log(key === collapseName)
  // console.log(key)
  // console.log(collapseName)
  // console.log(key === collapseName)

    returnValue = (
      subItem ? (
        <SidenavDropdown
          color={color}
          key={key}
          name={name}
          icon={icon}
          subItem={subItem}        
        />
      ) : (
        <NavLink to={layout + path} key={key}>
          {
            key !== "receptionDetail"
              ? (
                <SidenavCollapse
                  color={color}
                  key={key}
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                  subItem={subItem}
                />
              )
              : null
          }
        </NavLink>
      )
     );
    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SuiBox pt={3} pb={1} px={4} textAlign="center">
      <SuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SuiTypography variant="h6" color="secondary">
            <CloseIcon fontWeight={"bold"} />
          </SuiTypography>
        </SuiBox>
        <SuiBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <SuiBox component="img" src={brand} alt="Soft UI Logo" width="2rem" />}
          <SuiBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>
      <SuiBox pt={2} my={2} mx={2} mt="auto">
        <SidenavCard />
        <SuiBox mt={2}>
          {/* <SuiButton
            component="a"
            href="https://creative-tim.com/product/soft-ui-dashboard-pro-react"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            upgrade to pro
          </SuiButton> */}
        </SuiBox>
      </SuiBox>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
