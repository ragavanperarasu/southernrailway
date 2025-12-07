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

      <AppBar
        position="absolute"
        sx={{
          //borderRadius: 3,
          //width: { xs: "95%", md: "95%", lg: "95%" },
          backgroundColor: "#3271b8", // transparent white
          //top: 20, // vertical spacing from top
          //left: "50%",
          //transform: "translateX(-50%)", // ✅ centers horizontally
        }}
      >
        <Toolbar>
          <DirectionsSubwayIcon sx={{ fontSize: { xs: 30, md: 30, lg: 35 } }}/>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 1, fontSize: { xs: 20, md: 27, lg: 27 }}}
             gutterBottom
             onClick={()=>navigate("/")}
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

  );
};

export default Appbar;
