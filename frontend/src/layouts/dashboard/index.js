import React from "react";
import { Outlet} from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "./SideBar";
import Chat from '../../components/Chat'
const DashboardLayout = () => {

  return (
    <>
  <Stack direction='row'>
      <SideBar />
      <Outlet />
      <Chat />
      </Stack>
    </>
  );
};

export default DashboardLayout;
