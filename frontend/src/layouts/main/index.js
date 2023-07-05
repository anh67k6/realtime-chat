import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { Navigate } from "react-router-dom";

const isAuthenticated = true;

const MainLayout = () => {

  if (isAuthenticated) {
    return <Navigate to="/auth" />
  }

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} direction="column" textAlign={"center"}>
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
