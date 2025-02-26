import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={2}
    >
      <Typography variant="h1" color="text.secondary">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Page not found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
        Go to Products
      </Button>
    </Box>
  );
};
