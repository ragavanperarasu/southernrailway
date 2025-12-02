import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import CardContent from "@mui/material/CardContent";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffffff",
        paddingBottom: 5,
      }}
    >
      <CardContent
        position="static"
        sx={{
          borderRadius: 3,
          width: { xs: "95%", md: "95%", lg: "95%" },
          backgroundColor: "#3271b8", // transparent white
          boxShadow:"rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
          
        }}
      >
        {/* <Typography
          gutterBottom
          sx={{ color: "white", fontSize: "1.3rem", mb: 4 }}
        >
          Bharat Rails
        </Typography>
        <Typography gutterBottom sx={{ color: "white", fontSize: "1rem" }}>
          Support Team
        </Typography> */}
       
       {/* <Box sx={{display:'flex', justifyContent:'left', alignItems:'center'}}>
       <Typography
          gutterBottom
          sx={{ color: "#969595ff", fontSize: "0.9rem", marginRight:2}}
          onClick={() => {
            window.open("https://wa.me/9487745405", "_blank");
          }}
        >
          <EmailIcon sx={{ color: "#969595ff" }} />
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "#969595ff", fontSize: "0.9rem" , marginRight:2}}
          onClick={() => {
            window.open("https://wa.me/9487745405", "_blank");
          }}
        >
          <WhatsAppIcon sx={{ color: "#969595ff" }} />
        </Typography>
        <Typography
          gutterBottom
          sx={{ color: "#969595ff", fontSize: "0.9rem" , marginRight:1}}
          onClick={() => {
            window.open("https://wa.me/9487745405", "_blank");
          }}
        >
          <LinkedInIcon sx={{ color: "#969595ff" }} />
        </Typography>
</Box> */}
        <Typography
          gutterBottom
          sx={{
            color: "#ffffffff",
            fontSize: "0.7rem",
            textAlign: "center",
            fontFamily: "Roboto Slab",
          }}
        >
          Privacy Policy • Terms of Service
          <br />
          Copyright &copy; Sitemark 2025
        </Typography>
      </CardContent>
    </Box>
  );
};

export default Footer;
