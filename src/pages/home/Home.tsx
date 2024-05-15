import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography>Welcome to the Home Page</Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Login
      </Button>
    </Box>
  );
};

export default Home;
