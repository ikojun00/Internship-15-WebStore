import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mr: "auto",
          }}
          onClick={() => navigate("/")}
        >
          <ShoppingCart sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            WebStore
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Products
          </Button>
          <Button color="inherit" onClick={() => navigate("/add-product")}>
            Add New Product
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
