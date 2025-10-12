import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Appbar from "./Appbar";
import Footer from "./Footer";
import CardContent from "@mui/material/CardContent";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "#05070a", minHeight: "100vh" }}>
      <Appbar />

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography gutterBottom sx={{ color: "white", fontSize: "4rem" }}>
          Our Latest
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "#4ca6ff", fontSize: "4rem", marginLeft: 2 }}
        >
          Product
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography
          gutterBottom
          sx={{ color: "#FE5A1D", fontSize: "3rem", marginLeft: 2 }}
        >
          Make
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "#ffffffff", fontSize: "3rem", marginLeft: 2 }}
        >
          In
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "#00693E", fontSize: "3rem", marginLeft: 2 }}
        >
          India
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Typography
          gutterBottom
          sx={{
            color: "#969595ff",
            fontSize: "1rem",
            marginLeft: 2,
            width: "40%",
            textAlign: "center  ",
          }}
        >
          Monitor the real-time status of train AC coaches and track train
          locations easily. Stay informed to prevent system errors and ensure
          smooth travel management.
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom:10}}
      >
        <CardContent
          sx={{
            bgcolor: "transparent",
            width: { xs: "90%", md: "80%", lg: "80%" },
            borderRadius: 3,
            boxShadow: "0px 0px 16px -5px #6CB4EE",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <Box>
            <DirectionsSubwayIcon sx={{ color: "white", fontSize: 100 }} />
          </Box>

          <Box sx={{ marginLeft: 5 }}>
            <Typography
              gutterBottom
              sx={{
                color: "white",
                fontSize: "2rem",
                display: "flex",
                textAlign: "center",
              }}
            >
              Check Train Status
            </Typography>

            <Button sx={{ bgcolor: "#4ca6ff", color: "#05070a" }} onClick={() => navigate("/trainshow")}>
              Check Status
            </Button>
          </Box>
        </CardContent>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
