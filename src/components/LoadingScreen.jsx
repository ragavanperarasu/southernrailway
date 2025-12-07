import React, { useMemo } from "react";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnim from "../assets/loading.json"; // change path if needed

const LoadingScreen = () => {
  const animationMemo = useMemo(() => loadingAnim, []);

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",   // <-- Prevent horizontal scrollbar
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, px: 2 }}>
        <Lottie animationData={animationMemo} loop={true} />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
