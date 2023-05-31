import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const MainLayout = () => {

  const { isLoggedIn } = useSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to="/app" />
  }

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} direction={"column"} alignItems={"center"}>
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
