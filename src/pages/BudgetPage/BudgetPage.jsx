import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header/Header";
import axios from "axios";
import NewBudgetEntry from "../../components/NewBudgetEntry/NewBudgetEntry";
import DeleteBudgetEntryBox from "../../components/DeleteBudgetEntryBox/DeleteBudgetEntryBox"; // Import the delete dialog component

const BudgetPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [budgetData, setBudgetData] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    expense: "",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

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
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();

    if (!newBudget.category || !newBudget.amount || !newBudget.expense) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/budget",
        newBudget
      );
      setBudgetData([...budgetData, response.data]);
      setNewBudget({ category: "", amount: "", expense: "" });
    } catch (error) {
      console.error("Error adding budget:", error);
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

      setBudgetData(
        budgetData.filter((entry) => entry.id !== budgetToDelete.id)
      );
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting budget entry:", error);
    }
  };

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
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box m="40px 0 0 0" height="60vh" width={"100%"}>
          <DataGrid
            rows={budgetData}
            columns={columns}
            disableColumnResize
            sx={{ width: "100%" }}
          />
        </Box>
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
