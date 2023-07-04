import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Chat from "../../components/Chat/index";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessage from "../../components/SharedMessage";
import StarredMessage from "../../components/StarredMessage";

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
        {sideBar.open && (()=>{
          switch(sideBar.type){
            case "CONTACT":
              return <Contact />
            case "STARRED":
              return <StarredMessage />
            case "SHARED":
              return <SharedMessage />
            default:
              break;
          }
        })()}
        
      </Stack>
    </>
  );
};

export default GeneralApp;
