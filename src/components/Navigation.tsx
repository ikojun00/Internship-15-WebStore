import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          <ShoppingCart sx={{ mr: isMobile ? 0 : 1 }} />
          {!isMobile && (
            <Typography variant="h6" component="div">
              WebStore
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: { xs: 0, sm: 2 } }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Products
          </Button>
          <Button color="inherit" onClick={() => navigate("/add-product")}>
            {isMobile ? "Add" : "Add New Product"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
