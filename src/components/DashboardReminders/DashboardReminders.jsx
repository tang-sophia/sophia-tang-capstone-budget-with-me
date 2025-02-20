import "../DashboardReminders/DashboardReminders.scss";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardReminders = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const columns = [
    { field: "name", headerName: "Financial Activity", flex: 1 },
    { field: "due_date", headerName: "Due Date", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
  ];

  const isToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/calendar");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredData = data.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );

        const mappedData = filteredData.map((item, index) => ({
          id: index,
          name: item.name,
          due_date: new Date(item.due_date).toLocaleDateString(),
          category: item.category,
          isDueToday: isToday(item.due_date),
        }));

        setRows(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="25vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="25vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="dashboard-reminder__container">
      <Box
        className="dashboard-reminder__title"
        display="flex"
        alignItems="center"
        component={Link}
        to="/calendar"
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h5" ml={1}>
          Upcoming Due Dates and Reminders
        </Typography>
        <ChevronRightIcon />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box m="40px 0 0 0" height="100vh">
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnResize
            sx={{ width: "100%" }}
            getRowClassName={(params) =>
              params.row.isDueToday ? "highlight-row" : ""
            }
          />
        </Box>
      </Box>
    </div>
  );
};

export default DashboardReminders;
