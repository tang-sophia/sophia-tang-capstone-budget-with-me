import "../Topbar/Topbar.scss";
import {
  Box,
  IconButton,
  useTheme,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [hasDueToday, setHasDueToday] = useState(false);
  const [dueTodayItems, setDueTodayItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const dueToday = data.filter((item) => {
          const dueDate = new Date(item.due_date);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });

        setDueTodayItems(dueToday);
        setHasDueToday(dueToday.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Call the API to delete the item (if applicable)
      // await fetch(`http://localhost:8080/api/calendar/${itemId}`, { method: "DELETE" });

      // Update the state to remove the deleted item
      const updatedItems = dueTodayItems.filter((item) => item.id !== itemId);
      setDueTodayItems(updatedItems);
      setHasDueToday(updatedItems.length > 0);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={
          theme.palette.mode === "light" ? "#ddcdb9" : colors.primary[400]
        }
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton
          onClick={colorMode.toggleColorMode}
          aria-label="toggle theme"
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={handleNotificationClick}
          aria-label="notifications"
        >
          <Badge color="error" variant="dot" invisible={!hasDueToday}>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="settings">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton aria-label="profile">
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Due Today
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Typography variant="body1" color="error">
              Error: {error}
            </Typography>
          ) : dueTodayItems.length > 0 ? (
            <List>
              {dueTodayItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 1 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Category: ${item.category}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No items due today.</Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default Topbar;
