import React, { useState } from "react";
import chroma from "chroma-js";
import "./SidebarList.scss";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import vanessa from "../../assets/Vanessa.jpg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EditIcon from "@mui/icons-material/Edit";

const SidebarList = ({ colorMode, theme }) => {
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  const sidebarBackgroundColor = chroma(backgroundColor).darken(0.5).hex();

  const sidebarPadding = "1.5rem 1.5rem 65rem 1.5rem";
  const menuItemSpacing = "0";

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Sophia");
  const [profilePic, setProfilePic] = useState(vanessa);
  const [activeMenuItem, setActiveMenuItem] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuItemClick = (menu) => {
    setActiveMenuItem(menu);
  };

  return (
    <div
      style={{
        backgroundColor: sidebarBackgroundColor,
        color: textColor,
        height: "100vh",
        padding: sidebarPadding,
        boxSizing: "border-box",
        "--sidebar-bg-color": sidebarBackgroundColor,
      }}
    >
      <Sidebar
        className="sidebar"
        style={{
          backgroundColor: sidebarBackgroundColor,
          color: textColor,
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              backgroundColor: sidebarBackgroundColor,
              color: textColor,
              padding: menuItemSpacing,
            },
          }}
        >
          <Box
            mb="1.5625rem"
            mt="3rem"
            style={{
              backgroundColor: sidebarBackgroundColor,
              color: textColor,
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                height="100px"
                src={profilePic}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundColor: sidebarBackgroundColor,
                }}
                onClick={() => document.getElementById("file-input").click()}
              />
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </Box>

            <Box
              textAlign="center"
              mt="1rem"
              style={{ backgroundColor: sidebarBackgroundColor }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color={textColor}
                mt={4}
                style={{ position: "relative" }}
              >
                Budget with{" "}
                {isEditing ? (
                  <TextField
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    autoFocus
                    variant="standard"
                    style={{ backgroundColor: "transparent" }}
                  />
                ) : (
                  <>
                    <span>{name}</span>
                    <IconButton
                      size="small"
                      onClick={handleEditClick}
                      style={{
                        color: textColor,
                        position: "absolute",
                        top: "0",
                        right: "0",
                        opacity: 0.5,
                        padding: "0",
                      }}
                    >
                      <EditIcon style={{ fontSize: "0.9rem" }} />{" "}
                    </IconButton>
                  </>
                )}
              </Typography>
            </Box>
          </Box>
          <div
            className="menu-items"
            style={{ backgroundColor: sidebarBackgroundColor }}
          >
            <MenuItem
              title="Dashboard"
              component={<Link to="/" />}
              icon={<HomeOutlinedIcon />}
              className={
                activeMenuItem === "Dashboard" ? "active-menu-item" : ""
              }
              onClick={() => handleMenuItemClick("Dashboard")}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              title="Budget"
              component={<Link to="/budget" />}
              icon={<MonetizationOnOutlinedIcon />}
              className={activeMenuItem === "Budget" ? "active-menu-item" : ""}
              onClick={() => handleMenuItemClick("Budget")}
            >
              Budget
            </MenuItem>
            <MenuItem
              title="Calendar"
              component={<Link to="/calendar" />}
              icon={<EventOutlinedIcon />}
              className={
                activeMenuItem === "Calendar" ? "active-menu-item" : ""
              }
              onClick={() => handleMenuItemClick("Calendar")}
            >
              Calendar
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarList;
