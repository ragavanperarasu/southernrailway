import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5E4E2",
        paddingBottom: 10,
    //     "&::before": {
    //   content: '""',
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   width: "100%",
    //   height: "200px", // gradient height
    //   background: "linear-gradient(to bottom, rgba(0, 112, 255, 0.45), transparent)", 
    //   pointerEvents: "none", // prevent blocking clicks
    // },
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          borderRadius: 3,
       
          width: { xs: "90%", md: "95%", lg: "95%" },
          backgroundColor: "#3271b8", // transparent white
          top: 20, // vertical spacing from top
          left: "50%",
          transform: "translateX(-50%)", // ✅ centers horizontally
        }}
      >
        <Toolbar>
          <DirectionsSubwayIcon />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 1}}
            // gutterBottom
            // onClick={()=>navigate("/")}
          >
            Southern Railway
          </Typography>
          {/* <Button color="inherit" sx={{marginRight:5}} onClick={()=>navigate("/")} >Home</Button>
          <Button color="inherit" sx={{marginRight:5}} onClick={()=>navigate("/trainshow")} >Train Status</Button> */}
          {/* <Button color="inherit" sx={{marginRight:5}} onClick={()=>navigate("/")} >Support</Button>
          <Button sx={{ bgcolor: "white", color: "black"}}>
            Login
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
