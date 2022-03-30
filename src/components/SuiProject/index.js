import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";

function Projects({children}) {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  //console.log(renderMenu);
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  console.log(children)

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiBox>
          <SuiTypography variant="h6" gutterBottom>
            Projects
          </SuiTypography>
          <SuiBox display="flex" alignItems="center" lineHeight={0}>
            <PlaylistAddCheckIcon fontSize="medium">
              done
            </PlaylistAddCheckIcon>
            <SuiTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>All</strong> List
            </SuiTypography>
          </SuiBox>
        </SuiBox>
        <MoreVertIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="medium" onClick={openMenu}>
            more_vert
          </MoreVertIcon>
        {renderMenu}
          {/*  */}
        
      </SuiBox>
      <SuiBox>
        <SuiBox color="text" px={2}>
        {children}
        </SuiBox>
      </SuiBox> 
    </Card>
  );
}

export default Projects;