import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Appbar from "./Appbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import { Grid, Paper } from "@mui/material";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, Stack } from "@mui/material";

import { io } from "socket.io-client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Fix default marker issue using CDN URLs (no local images needed)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const getSignalInfo = (sig) => {
  if (sig >= 0 && sig <= 9) return { label: "Weak Signal", color: "#FF0000" };
  if (sig >= 10 && sig <= 14) return { label: "Fair Signal", color: "#FFA500" };
  if (sig >= 15 && sig <= 19) return { label: "Good Signal", color: "#FFFF00" };
  if (sig >= 20 && sig <= 30) return { label: "Excellent Signal", color: "#3FFF00" };
  return { label: "No Signal", color: "#888888" };
};

const Trainshow = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [dataopen, setDataOpen] = useState(false);


  useEffect(() => {
    //http://localhost:5000
    // Connect to Socket.IO server http://72.60.103.126/
    const socket = io("http://72.60.103.126/"); // replace with your server URL

    // Request data
    socket.emit("getdata");

    // Listen for product data
    socket.on("productData", (data) => {
      console.log("Received data:", data);
      setProducts(data);
      setLoading(false);
    });

    // Listen for errors
    socket.on("error", (err) => {
      setError(err.message);
      setLoading(false);
    });

    console.log(products);
    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const position = [11.0168, 76.9558]; // Coimbatore

  function showProductDialog(p){
    setDataOpen(p)
    setOpen(true)
  }

  if (loading) {
    return (<Box sx={{ bgcolor: "#E5E4E2", minHeight: "100vh", height: "100%" }}>
      <Appbar />
      <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>Fetching Data...</Typography>
     

      <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ mt: 5 }}>
      <CircularProgress enableTrackSlot size="3rem" />
      </Stack>
      
    </Box>);
  }


  return (
    <Box sx={{ bgcolor: "#ffffffff", minHeight: "100vh", height: "100%" }}>
      <Appbar />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{dataopen?.coachid}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Main Battery : {dataopen?.pribat}v<br/>
            Backup Battery : {dataopen?.backbat}v<br/>
            Signal Strength : {dataopen ? getSignalInfo(dataopen.sig).label : ''} ({dataopen.sig})<br/>
            Primary Power (110V) : {dataopen?.pripow ? "On" : "Off"}<br/>
            Maintainance Mode : {dataopen?.maintainance ? "On" : "Off"}<br/>
            Latitude : {dataopen?.lat}<br/>
            Longitude : {dataopen?.lng}<br/>
            Last Updated : {dataopen ? new Date(dataopen.updatedAt).toLocaleString() : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => navigate("/trainstatus", { state: dataopen })}>
            History
          </Button>
          <Button onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            width: "95%",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={5}
            sx={{
              width: { xs: "100%", md: "45%", lg: "45%" },
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={5}
              sx={{
                bgcolor: "#FF91A4",
                mb: 2,
                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: 20,
                  fontWeight: 600,
                  mb: -5,
                  width: "100%",
                }}
              >
                Fault Detected
              </Typography>


              {products.filter((product) => product.pribat < 20).map((product, index) => (
                  <Grid
                  key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{ bgcolor: "#007FFF", padding: 1, borderRadius: 2 }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      {product.coachid}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      Updated : {" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Main Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Backup Battery: {product.backbat}v
                    </Typography>
                    
                  </Grid>
                ))}
            </Grid>

            <Grid
              container
              spacing={5}
              sx={{
                bgcolor: "#FCF75E",
                mb: 2,
                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: 20,
                  fontWeight: 600,

                  mb: -5,
                  width: "100%",
                }}
              >
                Needs Inspection
              </Typography>
              {products
                .filter((product) => product.pribat === 20)
                .map((product, index) => (
                  <Grid
                  key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{ bgcolor: "#007FFF", padding: 1, borderRadius: 2 }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      {product.coachid}
                    </Typography>


                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      Updated : {" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Main Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Backup Battery: {product.backbat}v
                    </Typography>
                    
                  </Grid>
                ))}
            </Grid>

            <Grid
              container
              spacing={5}
              sx={{
                bgcolor: "#50C878",
                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: 20,
                  fontWeight: 600,

                  mb: -5,
                  width: "100%",
                }}
              >
                Working Fine
              </Typography>

              {products
                .filter((product) => product.pribat > 20)
                .map((product, index) => (
                  <Grid
                  key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{ bgcolor: "#007FFF", padding: 1, borderRadius: 2 }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      {product.coachid}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                        mb: 1,
                      }}
                    >
                      Updated : {" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Main Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Backup Battery: {product.backbat}v
                    </Typography>

                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid container sx={{ width: { xs: "100%", md: "50%", lg: "45%" } }}>
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <MapContainer
                center={position}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                />

{
                  products.map((product, index) => (
                    <Marker position={[product.lat, product.lng]} key={index} eventHandlers={{
    click: () => showProductDialog(product),
  }}>
                      <Popup onClick={() => showProductDialog(product)}>{product.coachid}</Popup>
                    </Marker>
                  ))
}
                

              </MapContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Trainshow;
