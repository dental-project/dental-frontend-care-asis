import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import routes from "routes.js";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

// Soft UI Dashboard PRO React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";

function Breadcrumbs({ icon, title, urls, light }) {
  const url = urls.slice(0, -1);
  let title_ko = title
  routes.filter((data) => { 
    if(data.subItem){
      data.subItem.filter((subdata) => {
        if(subdata.key===title) title_ko = subdata.name 
      })
    }else{
      if(data.key===title) title_ko = data.name 
    }
  });

  return (
    <SuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <SuiTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <HomeIcon/>
          </SuiTypography>
        </Link>
        {url.map((el) => (
          <Link to={`/${el}`} key={el}>
            <SuiTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </SuiTypography>
          </Link>
        ))}
        {/* <SuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
          {title_ko}
        </SuiTypography> */}
      </MuiBreadcrumbs>
      <SuiTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {/* {title.replace("-", " ")} */}
        {title_ko}
      </SuiTypography>
    </SuiBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  urls: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
