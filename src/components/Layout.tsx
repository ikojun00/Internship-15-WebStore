import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Container } from "@mui/material";

export const Layout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navigation />
      <Container component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
