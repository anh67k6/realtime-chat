import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import Chat from "../../components/Chat/index";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";

const GeneralApp = () => {
  const theme = useTheme();
  
  const { sideBar } = useSelector((store) => store.app);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: sideBar.open
              ? `calc(100vw - 740px )`
              : "calc(100vw - 420px )",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
          }}
        >
          <Chat />
        </Box>
        
        {/* Contact */}
        {sideBar.open && <Contact />}
        
      </Stack>
    </>
  );
};

export default GeneralApp;
