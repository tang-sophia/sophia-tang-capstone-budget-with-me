import "../Header/Header.scss";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Header = ({ title, subtitle }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

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
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h1">{title}</Typography>
        <IconButton
          onClick={handleRefresh}
          sx={{ color: "primary.main", "&:hover": { color: "secondary.main" } }}
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="h4" className="calendar__subtitle">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
