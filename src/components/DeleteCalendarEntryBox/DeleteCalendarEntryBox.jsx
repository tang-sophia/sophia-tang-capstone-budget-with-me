import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteCalendarEntryBox = ({
  open = false,
  onClose = () => {},
  eventToDelete = {},
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
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-event-dialog">
      <DialogTitle
        id="delete-event-dialog"
        sx={{
          backgroundColor: colors.primaryBackground,
          color: colors.titleColor,
        }}
      >
        Delete Event
      </DialogTitle>
      <DialogContent
        sx={{ backgroundColor: colors.primaryBackground, padding: "20px" }}
      >
        <Typography variant="body1" sx={{ color: colors.textColor }}>
          Are you sure you want to delete the event{" "}
          <strong>"{eventToDelete?.title}"</strong>?
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

export default DeleteCalendarEntryBox;
