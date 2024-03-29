import React, {useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Soft UI Dashboard PRO React components
import SuiButton from "components/Sui/SuiButton";
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox, cardIcon } from "components/Sidenav/styles/sidenavCard";

// Soft UI Dashboard PRO React context
import { useSoftUIController } from "context";

function SidenavCard() {
  const [controller] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return (() => clearInterval(id))
  }, []);

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        {/* <SuiBox
          bgColor="white"
          width="2rem"
          height="2rem"
          borderRadius="md"
          shadow="md"
          mb={2}
          sx={cardIconBox}
        >
          <Icon fontSize="medium" sx={(theme) => cardIcon(theme, { sidenavColor })}>
            star
          </Icon>
        </SuiBox> */}
        <SuiBox lineHeight={1}>
          <SuiTypography variant="h6" color="white">
            Dental.A 
          </SuiTypography>
          <SuiBox>
            <SuiTypography variant="caption" color="white" fontWeight="medium">
            {time.toLocaleDateString()}
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={1.825} mt={0.5}>
            <SuiTypography variant="H6" color="white" fontWeight="medium">
              {time.toLocaleTimeString()}
            </SuiTypography>
          </SuiBox>
          {/* <SuiButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/react/quick-start/soft-ui-dashboard/"
            target="_blank"
            rel="noreferrer"
            size="small"
            color="white"
            fullWidth
          >
            documentation
          </SuiButton> */}
        </SuiBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
