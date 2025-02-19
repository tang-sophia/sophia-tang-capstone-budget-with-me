import "../NewCalendarEntryBox/NewCalendarEntryBox.scss";
import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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

const NewCalendarEntryBox = ({
  openDialog,
  setOpenDialog,
  newEvent,
  setNewEvent,
  handleSubmit,
  handleCategoryChange,
  handleChange,
}) => {
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name"
            fullWidth
            margin="normal"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            name="due_date"
            value={newEvent.due_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Category Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newEvent.category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Event
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCalendarEntryBox;
