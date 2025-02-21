import React from "react";
import chroma from "chroma-js";
import "./SidebarList.scss";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import vanessa from "../../assets/Vanessa.jpg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const SidebarList = ({ colorMode, theme }) => {
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  const sidebarBackgroundColor = chroma(backgroundColor).darken(0.5).hex();

  const sidebarPadding = "1.5rem 1.5rem 65rem 1.5rem";
  const menuItemSpacing = "0";

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
                src={vanessa}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  backgroundColor: sidebarBackgroundColor,
                }}
              />
            </Box>

            <Box
              textAlign="center"
              mt="1rem"
              style={{ backgroundColor: sidebarBackgroundColor }}
            >
              <Typography variant="h3" fontWeight="bold" color={textColor}>
                Budget with Me
              </Typography>
              <Typography variant="h4" color={textColor}>
                Sophia Tang
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
              style={{
                marginBottom: menuItemSpacing,
                backgroundColor: sidebarBackgroundColor,
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              title="Budget"
              component={<Link to="/budget" />}
              icon={<MonetizationOnOutlinedIcon />}
              style={{
                marginBottom: menuItemSpacing,
                backgroundColor: sidebarBackgroundColor,
              }}
            >
              Budget
            </MenuItem>
            <MenuItem
              title="Calendar"
              component={<Link to="/calendar" />}
              icon={<EventOutlinedIcon />}
              style={{
                marginBottom: menuItemSpacing,
                backgroundColor: sidebarBackgroundColor,
              }}
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
