import "../DashboardExpenses/DashboardExpenses.scss";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardExpenses = () => {
  return (
    <div className="dashboard-budget__container">
      <Box
        className="dashboard-budget__title"
        display="flex"
        alignItems="center"
        component={Link}
        to="/budget"
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h5" ml={1}>
          Budget Breakdown
        </Typography>
        <ChevronRightIcon />
      </Box>
    </div>
  );
};
export default DashboardExpenses;
