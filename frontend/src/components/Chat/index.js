
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from './Footer';
const Conversation = () => {
    const theme = useTheme();

    return (<Stack height={"auto"} maxHeight={"100vh"} width={"100%"}>
        <Header />
        <Box width={'100%'} sx={{flexGrow: 1}} >
        </Box>
        <Footer />
    </Stack>)
}

export default Conversation;