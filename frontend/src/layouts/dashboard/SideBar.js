import { Avatar, Box, Divider, IconButton, Stack} from "@mui/material";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import AntSwitch from '../../components/AntSwitch.js'
import useSettings from '../../hooks/useSettings.js'
import { useTheme} from "@mui/material/styles";
import React, {useState} from 'react';

const SideBar = ( ) => {
    const [selected, setSelected] = useState(0);
    const theme = useTheme();
    const {onToggleMode} = useSettings();

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
      </>)
}

export default SideBar;