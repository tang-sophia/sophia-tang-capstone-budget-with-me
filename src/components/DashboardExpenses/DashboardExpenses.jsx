import "../DashboardExpenses/DashboardExpenses.scss";
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DashboardExpenses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentMonthYear = () => {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/budget", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        const currentMonth = new Date().toLocaleString("default", {
          month: "long",
        });
        const currentMonthData = result.filter(
          (item) => item.month.toLowerCase() === currentMonth.toLowerCase()
        );

        const aggregatedData = currentMonthData.reduce((acc, item) => {
          const existingCategory = acc.find(
            (i) => i.category === item.category
          );
          if (existingCategory) {
            existingCategory.amount += Number(item.amount);
          } else {
            acc.push({ category: item.category, amount: Number(item.amount) });
          }
          return acc;
        }, []);

        setData(aggregatedData);
        setLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
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
        height="200px"
      >
        <Typography color="error">Something went wrong: {error}</Typography>
      </Box>
    );
  }

  return (
    <div className="dashboard-budget__container">
      <Box
        mt={5}
        className="dashboard-budget__title"
        display="flex"
        alignItems="center"
        component={Link}
        to="/budget"
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="h4" ml={1}>
          {getCurrentMonthYear()}: Budget Breakdown
        </Typography>
        <ChevronRightIcon />
      </Box>

      {/* Pie Chart */}
      <Box mt={4} width="100%" height={500}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="amount"
              nameKey="category"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(2)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default DashboardExpenses;
