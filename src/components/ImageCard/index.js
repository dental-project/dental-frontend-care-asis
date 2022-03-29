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

import React from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SuiBox from "components/Sui/SuiBox";
import SuiTypography from "components/Sui/SuiTypography";
import SuiButton from "components/Sui/SuiButton";
import SuiAvatar from "components/Sui/SuiAvatar";

function ImageCard({ image, authors }) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SuiAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <SuiBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of ImageCard
ImageCard.defaultProps = {
  authors: [],
};

// Typechecking props for the ImageCard
ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  //label: PropTypes.string.isRequired,
  //title: PropTypes.string.isRequired,
  //description: PropTypes.string.isRequired,
  // action: PropTypes.shape({
  //   type: PropTypes.oneOf(["external", "internal"]),
  //   route: PropTypes.string.isRequired,
  //   color: PropTypes.oneOf([
  //     "primary",
  //     "secondary",
  //     "info",
  //     "success",
  //     "warning",
  //     "error",
  //     "light",
  //     "dark",
  //     "white",
  //   ]).isRequired,
  //   label: PropTypes.string.isRequired,
  // }).isRequired,
  // authors: PropTypes.arrayOf(PropTypes.object),
};

export default ImageCard;
