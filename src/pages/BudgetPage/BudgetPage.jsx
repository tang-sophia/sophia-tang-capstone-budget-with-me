import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header/Header";
import axios from "axios";
import NewBudgetEntry from "../../components/NewBudgetEntry/NewBudgetEntry";
import DeleteBudgetEntryBox from "../../components/DeleteBudgetEntryBox/DeleteBudgetEntryBox";

const BudgetPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [budgetData, setBudgetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    expense: "",
    month: new Date().toLocaleString("default", { month: "long" }),
  });
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [isAllMonths, setIsAllMonths] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDataByMonth(selectedMonth);
  }, [selectedMonth, budgetData]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/budget");
      setBudgetData(response.data);
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
    if (name === "month") {
      setSelectedMonth(value);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();

    if (!newBudget.category || !newBudget.amount || !newBudget.expense) {
      alert("Please fill out all fields.");
      return;
    }

    const newBudgetEntry = {
      ...newBudget,
      id: Date.now(),
    };

    setBudgetData((prevData) => [...prevData, newBudgetEntry]);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/budget",
        newBudget
      );
      setBudgetData((prevData) =>
        prevData.map((entry) =>
          entry.id === newBudgetEntry.id
            ? { ...entry, id: response.data.id }
            : entry
        )
      );
      setNewBudget({
        category: "",
        amount: "",
        expense: "",
        month: new Date().toLocaleString("default", { month: "long" }),
      });
    } catch (error) {
      console.error("Error adding budget:", error);
      setBudgetData((prevData) =>
        prevData.filter((entry) => entry.id !== newBudgetEntry.id)
      );
      alert("There was an error adding the budget entry.");
    }
  };

  const handleDeleteClick = (budgetEntry) => {
    setBudgetToDelete(budgetEntry);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/budget/${budgetToDelete.id}`
      );

      setBudgetData((prevData) =>
        prevData.filter((entry) => entry.id !== budgetToDelete.id)
      );
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting budget entry:", error);
    }
  };

  const filterDataByMonth = (month) => {
    if (isAllMonths) {
      setFilteredData(budgetData);
    } else {
      const filtered = budgetData.filter((entry) => entry.month === month);
      setFilteredData(filtered);
    }
  };

  const totalAmount = filteredData.reduce(
    (total, entry) => total + parseFloat(entry.amount),
    0
  );

  const formattedTotalAmount = totalAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const columns = [
    {
      field: "category",
      headerName: "Category",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Action",
      renderCell: (params) => (
        <button
          onClick={() => handleDeleteClick(params.row)}
          style={{
            backgroundColor: "#d50000",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Delete
        </button>
      ),
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="BUDGET" subtitle="Tracking your expenses" />

      <NewBudgetEntry
        newBudget={newBudget}
        handleInputChange={handleInputChange}
        handleAddBudget={handleAddBudget}
      />
      <Box
        display="flex"
        justifyContent="space-evenly"
        mb={2}
        flexWrap="wrap"
        gap={1}
      >
        <Button
          onClick={() => {
            setIsAllMonths(true);
            setSelectedMonth(null);
          }}
          variant={isAllMonths ? "contained" : "outlined"}
        >
          All Months
        </Button>
        {Array.from({ length: 12 }, (_, i) => (
          <Button
            key={i}
            onClick={() => {
              const monthName = new Date(0, i).toLocaleString("default", {
                month: "long",
              });
              setSelectedMonth(monthName);
              setIsAllMonths(false);
            }}
            variant={
              selectedMonth ===
              new Date(0, i).toLocaleString("default", { month: "long" })
                ? "contained"
                : "outlined"
            }
          >
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </Button>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box height="60vh" width={"100%"}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            disableColumnResize
            sx={{ width: "100%" }}
          />
        </Box>
      </Box>

      {/* Fixed row for Total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: colors.primary[400],
          padding: "10px",
          marginTop: "20px",
          borderRadius: "4px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" color="white">
          Total
        </Typography>
        <Typography variant="h6" color="white">
          ${formattedTotalAmount}
        </Typography>
      </Box>

      <DeleteBudgetEntryBox
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        budgetToDelete={budgetToDelete}
        onDeleteConfirm={handleDeleteConfirm}
        theme={theme}
      />
    </Box>
  );
};

export default BudgetPage;
