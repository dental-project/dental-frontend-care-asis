import React from "react";

// @mui material components
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";

function ProjectHeader({children, title, subTitle} ) {

  return (
    <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiBox>
            <SuiTypography variant="h6" gutterBottom>
                {title}
            </SuiTypography>
            <SuiBox display="flex" alignItems="center" lineHeight={0}>
                <PlaylistAddCheckIcon fontSize="medium">
                    done
                </PlaylistAddCheckIcon>
                <SuiTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;<strong>{subTitle}</strong>
                </SuiTypography>
            </SuiBox>
        </SuiBox>
        {children}
    </SuiBox>
  );
}

export default ProjectHeader;