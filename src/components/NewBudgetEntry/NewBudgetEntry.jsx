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
  // Category options
  const categories = [
    "Household",
    "Utilities",
    "Subscriptions",
    "Grocery",
    "Transportation",
    "Loans",
    "Credit Card",
    "Maintenance & Repair",
    "Health",
    "Children",
    "Miscellaneous",
  ];

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
      {/* Category Dropdown */}
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

      {/* Amount Input */}
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={newBudget.amount}
        onChange={handleInputChange}
        fullWidth
        required
      />

      {/* Expense Input */}
      <TextField
        label="Expense"
        name="expense"
        value={newBudget.expense}
        onChange={handleInputChange}
        fullWidth
        required
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="secondary">
        Add
      </Button>
    </Box>
  );
};

export default NewBudgetEntry;
