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
  theme, // Ensure that the theme prop is passed properly
}) => {
  // Define colors for both dark and light modes
  const lightModeColors = {
    primaryBackground: "#f5f5f5", // Light background color
    titleColor: "#333", // Dark text for light mode
    cancelColor: "#1976d2", // Standard blue for cancel
    deleteColor: "#d50000", // Red for delete
    textColor: "#000", // Black text for body
  };

  const darkModeColors = {
    primaryBackground: "#333", // Dark background color
    titleColor: "#fff", // Light text for dark mode
    cancelColor: "#90caf9", // Light blue for cancel
    deleteColor: "#d50000", // Red for delete (remains consistent)
    textColor: "#fff", // White text for body
  };

  // Get the colors based on the theme mode (light or dark)
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
