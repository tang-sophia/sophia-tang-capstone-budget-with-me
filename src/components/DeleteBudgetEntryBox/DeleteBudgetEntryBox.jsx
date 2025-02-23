import "../DeleteBudgetEntryBox/DeleteBudgetEntryBox.scss";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteBudgetEntryBox = ({
  open = false,
  onClose = () => {},
  budgetToDelete = {},
  onDeleteConfirm = () => {},
  theme,
}) => {
  const lightModeColors = {
    primaryBackground: "#f5f5f5",
    titleColor: "#333",
    cancelColor: "#1976d2",
    deleteColor: "#d50000",
    textColor: "#000",
  };

  const darkModeColors = {
    primaryBackground: "#333",
    titleColor: "#fff",
    cancelColor: "#90caf9",
    deleteColor: "#d50000",
    textColor: "#fff",
  };

  const colors =
    theme?.palette?.mode === "dark" ? darkModeColors : lightModeColors;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-budget-dialog"
    >
      <DialogTitle
        id="delete-budget-dialog"
        sx={{
          backgroundColor: colors.primaryBackground,
          color: colors.titleColor,
        }}
      >
        Delete Budget Entry
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: colors.primaryBackground, padding: "20px" }}
      >
        <Typography variant="body1" sx={{ color: colors.textColor }}>
          Are you sure you want to delete the budget entry for{" "}
          <strong>"{budgetToDelete?.category}"</strong> with an amount of{" "}
          <strong>${budgetToDelete?.amount}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: colors.primaryBackground }}>
        <Button onClick={onClose} sx={{ color: colors.cancelColor }}>
          Cancel
        </Button>
        <Button onClick={onDeleteConfirm} sx={{ color: colors.deleteColor }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBudgetEntryBox;
