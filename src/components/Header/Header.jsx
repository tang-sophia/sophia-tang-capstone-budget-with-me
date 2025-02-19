import "../Header/Header.scss";
import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width="100%"
      padding="20px 0"
    >
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h4" className="calendar__subtitle">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
