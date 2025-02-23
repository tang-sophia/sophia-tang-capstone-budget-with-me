import "../NewBudgetEntry/NewBudgetEntry.scss";
import React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const NewBudgetEntry = ({ newBudget, handleInputChange, handleAddBudget }) => {
  const categories = [
    "Household",
    "Utilities",
    "Subscriptions",
    "Groceries",
    "Transportation",
    "Loans",
    "Credit Card",
    "Maintenance & Repair",
    "Health",
    "Children",
    "Miscellaneous",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();

  return (
    <Box
      component="form"
      onSubmit={handleAddBudget}
      sx={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="month-label">Month</InputLabel>
        <Select
          labelId="month-label"
          id="month"
          name="month"
          value={newBudget.month || months[currentMonth]}
          label="Month"
          onChange={handleInputChange}
        >
          {months.map((month, index) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={newBudget.category}
          label="Category"
          onChange={handleInputChange}
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={newBudget.amount}
        onChange={handleInputChange}
        fullWidth
        required
      />

      <TextField
        label="Expense"
        name="expense"
        value={newBudget.expense}
        onChange={handleInputChange}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="secondary">
        Add
      </Button>
    </Box>
  );
};

export default NewBudgetEntry;
