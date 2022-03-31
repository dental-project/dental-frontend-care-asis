import React from "react";

// Soft UI Dashboard React components
import SuiBox from "components/Sui/SuiBox";

function ProjectBody({children} ) {

  return (
    <SuiBox>
        <SuiBox color="text" px={2}>
            {children}
        </SuiBox>
    </SuiBox> 
  );
}

export default ProjectBody;