import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from '../../hooks/useSettings.js'

const DashboardLayout = () => {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();

  const {onToggleMode} = useSettings();

  console.log(theme);
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  return (
    <>
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
            <Avatar src={faker.image.avatar()} />

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
                    sx={{color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary, width: "max-content" }}
                    onClick={() => {
                      setSelected(el.index);
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
                  <IconButton sx={{ color : "#fff", width: "max-content" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                  sx={{ color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary, width: "max-content" }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>

          <AntSwitch defaultChecked onChange={()=>{
            onToggleMode();
          }}/>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
