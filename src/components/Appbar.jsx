import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: "Master Device", path: "/" },
    // { text: "Train Status", path: "/trainshow" },
  ];

  return (
    <>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: "#3271b8",
        }}
      >
        <Toolbar>
          {/* 🔹 Burger Icon (Mobile Only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <DirectionsSubwayIcon sx={{ fontSize: { xs: 28, md: 35 } }} />

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              paddingLeft: 1,
              fontSize: { xs: 18, md: 27 },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Southern Railway
          </Typography>

          {/* 🔹 Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Master Device
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

{/* 🔹 Professional Mobile Drawer */}
<Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
  <Box
    sx={{
      width: 260,
      height: "100%",
      backgroundColor: "#f4f6f8", // light professional background
    }}
    role="presentation"
  >
    {/* 🔹 Drawer Header */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 2,
        backgroundColor: "#3271b8",
        color: "white",
      }}
    >
      <DirectionsSubwayIcon />
      <Typography variant="h6" fontWeight="bold" sx={{fontSize: { xs: 18, md: 27 }}}>
        Southern Railway
      </Typography>
    </Box>

    {/* 🔹 Menu Items */}
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            sx={{
              px: 3,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
            onClick={() => {
              navigate(item.path);
              setOpen(false);
            }}
          >
            <ListItemText
              primary={item.text}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

    </>
  );
};

export default Appbar;
