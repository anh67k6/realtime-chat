import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem } from "@mui/material";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import AntSwitch from '../../components/AntSwitch.js'
import useSettings from '../../hooks/useSettings.js'
import { useTheme } from "@mui/material/styles";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app"
    case 1:
      return "/group"
    case 2:
      return "/call"
    case 3:
      return "/settings"
    default:
      break;
  }
}

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile"
    case 1:
      return "/settings"

    case 2:
      return "/auth/login"

    default:
      break;
  }
}

const SideBar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate()
  const theme = useTheme();
  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (<>
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
        height: "100vh",
        width: 100,
      }}
      p={2}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Stack
          direction="column"
          alignItems="center"
          sx={{ width: "100%" }}
          spacing={3}
        >
          <Avatar id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            src={faker.image.avatar()} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem onClick={() => {
                  handleClick()
                }}>
                  <Stack
                    onClick={() => {
                      navigate(getMenuPath(idx))

                    }}
                    sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent="space-between">

                    <span>{el.title}</span>{el.icon}
                  </Stack>{" "}
                </MenuItem>
              ))}

            </Stack>
          </Menu>
          <Stack
            spacing={3}
            sx={{ width: "100%" }}
            direction="column"
            alignItems="center"
          >
            {Nav_Buttons.map((el) => {
              return el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ color: "#fff", width: "max-content" }}>
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  sx={{ color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary, width: "max-content" }}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index))
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            <Divider sx={{ width: 50 }} />
            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ color: "#fff", width: "max-content" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  navigate(getPath(3))
                  setSelected(3);
                }}
                sx={{ color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary, width: "max-content" }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <AntSwitch defaultChecked onChange={() => {
          onToggleMode();
        }} />
      </Stack>
    </Box>
  </>)
}

export default SideBar;
