import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Appbar from "./Appbar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BoltIcon from "@mui/icons-material/Bolt";

const Trainstatus = () => {
  return (
    <Box sx={{ bgcolor: "#ffffffff", minHeight: "100vh" }}>
      <Appbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            width: { xs: "95%", md: "85%", lg: "75%" },
            borderRadius: 3,
            boxShadow: "0px 0px 16px -5px #6CB4EE",
            p: 4,
          }}
        >
          {/* Train ID */}
          <Typography
            gutterBottom
            sx={{
              color: "white",
              fontSize: 45,
              fontWeight: 600,
              textAlign: "center",
              mb: 4,
            }}
          >
            BE-576231
          </Typography>



          {/* 2x2 Grid Layout */}
          <Grid container spacing={3}>
            {/* 1,1 Signal Strength */}
            <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Signal Strength
              </Typography>
              <Typography
                sx={{
                  color: "#09ba15ff",
                  fontSize: 36,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SignalCellularAltIcon
                  sx={{ color: "#09ba15ff", fontSize: 55, mr: 1 }}
                />
                95%
              </Typography>
            </Grid>

            {/* 1,2 Main Power */}
            <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Main Power Supply
              </Typography>
              <Typography
                sx={{
                  color: "#09ba15ff",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BoltIcon sx={{ color: "#09ba15ff", fontSize: 55, mr: 1 }} />
                110v - On 
              </Typography>
            </Grid>

            {/* 2,1 Main Battery */}
            <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Main Battery
              </Typography>
              <Typography
                sx={{
                  color: "#FF5800",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BatteryChargingFullIcon
                  sx={{ color: "#FF5800", fontSize: 50, mr: 1 }}
                />
                24.00 v
              </Typography>
            </Grid>

            {/* 2,2 Backup Battery */}
            <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Backup Battery
              </Typography>
              <Typography
                sx={{
                  color: "#007FFF",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BatteryChargingFullIcon
                  sx={{ color: "#007FFF", fontSize: 50, mr: 1 }}
                />
                25.00 v
              </Typography>
            </Grid>

            <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                FDS Power Supply
              </Typography>
              <Typography
                sx={{
                  color: "#ffe600ff",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BoltIcon
                  sx={{ color: "#ffe600ff", fontSize: 50, mr: 1 }}
                />
                Main Power
              </Typography>
            </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 4 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Train Location
              </Typography>
              <Typography
                sx={{
                  color: "#ffe600ff",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BoltIcon
                  sx={{ color: "#ffe600ff", fontSize: 50, mr: 1 }}
                />
                Goto Maps
              </Typography>
            </Grid>

          </Grid>
        </Box>
      </Box>



      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            width: { xs: "95%", md: "85%", lg: "75%" },
            borderRadius: 3,
            boxShadow: "0px 0px 16px -5px #6CB4EE",
            p: 4,
          }}
        >
          {/* Train ID */}
          <Typography
            gutterBottom
            sx={{
              color: "white",
              fontSize: 45,
              fontWeight: 600,
              textAlign: "center",
              mb: 4,
            }}
          >
            BE-576231
          </Typography>



          {/* 2x2 Grid Layout */}
          <Grid container spacing={3}>
            {/* 1,1 Signal Strength */}
            <Grid item size={{xs: 12, sm: 6, md: 6 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Signal Strength
              </Typography>
              <Typography
                sx={{
                  color: "#09ba15ff",
                  fontSize: 36,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SignalCellularAltIcon
                  sx={{ color: "#09ba15ff", fontSize: 55, mr: 1 }}
                />
                95%
              </Typography>
            </Grid>

            {/* 1,2 Main Power */}
            <Grid item size={{xs: 12, sm: 6, md: 6 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Main Power Supply
              </Typography>
              <Typography
                sx={{
                  color: "#09ba15ff",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BoltIcon sx={{ color: "#09ba15ff", fontSize: 55, mr: 1 }} />
                110v - On 
              </Typography>
            </Grid>

            {/* 2,1 Main Battery */}
            <Grid item size={{xs: 12, sm: 6, md: 6 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Main Battery
              </Typography>
              <Typography
                sx={{
                  color: "#FF5800",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BatteryChargingFullIcon
                  sx={{ color: "#FF5800", fontSize: 50, mr: 1 }}
                />
                24.00 v
              </Typography>
            </Grid>

            {/* 2,2 Backup Battery */}
            <Grid item size={{xs: 12, sm: 6, md: 6 }}>
              <Typography
                gutterBottom
                sx={{ color: "white", fontSize: 28, textAlign: "center" }}
              >
                Backup Battery
              </Typography>
              <Typography
                sx={{
                  color: "#007FFF",
                  fontSize: 28,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BatteryChargingFullIcon
                  sx={{ color: "#007FFF", fontSize: 50, mr: 1 }}
                />
                25.00 v
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      
    </Box>
  );
};

export default Trainstatus;
