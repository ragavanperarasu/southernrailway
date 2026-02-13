import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Appbar from "./Appbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import { Grid, Paper } from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { io } from "socket.io-client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Battery6BarIcon from "@mui/icons-material/Battery6Bar";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
import UpdateIcon from "@mui/icons-material/Update";
import RssFeedIcon from "@mui/icons-material/RssFeed";

import LoadingScreen from "./LoadingScreen";

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
  if (sig >= 20 && sig <= 30)
    return { label: "Excellent Signal", color: "#3FFF00" };
  return { label: "No Signal", color: "#888888" };
};

const position = [11.0168, 76.9558]; // Coimbatore

const Trainshow = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [dataopen, setDataOpen] = useState(false);

  const [maintCount, setMaintCount] = useState(0);
  const [faultCount, setFaultCount] = useState(0);
  const [inspectCount, setInspectCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);

  useEffect(() => {
    const mainc = products.filter((p) => p.maintainance === true).length;
    const fault = products.filter(
      (p) => p.pribat < 20 && p.maintainance === false
    ).length;
    const inspect = products.filter(
      (p) => p.pribat >= 20 && p.pribat <= 23 && p.maintainance === false
    ).length;
    const normal = products.filter(
      (p) => p.pribat > 23 && p.maintainance === false
    ).length;

    setNormalCount(normal);
    setInspectCount(inspect);
    setMaintCount(mainc);
    setFaultCount(fault);
  }, [products]);

  useEffect(() => {
    //http://localhost:5000
    const socket = io(import.meta.env.VITE_API_URL); // replace with your server URL

    // Request data
    socket.emit("getdata");

    // Listen for product data
    socket.on("productData", (data) => {
      //console.log("Received data:", data);
      setProducts(data);
      setLoading(false);
    });

    // Listen for errors
    socket.on("error", (err) => {
      setError(err.message);
      setLoading(false);
    });

    //console.log(products);
    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  function showProductDialog(p) {
    setDataOpen(p);
    setOpen(true);
  }

  if (loading) {
    return (
      <>
        <Appbar />
        <LoadingScreen />
      </>
    );
  }

  return (
    <Box sx={{ bgcolor: "#ffffffff", minHeight: "100vh", height: "100%" }}>
      <Appbar />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{dataopen?.coachid}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Primary Battery : {dataopen?.pribat}v<br />
            Backup Battery : {dataopen?.backbat}v<br />
            Signal Strength :{" "}
            {dataopen ? getSignalInfo(dataopen.sig).label : ""} ({dataopen.sig})
            <br />
            Primary Power (110V) : {dataopen?.pripow ? "On" : "Off"}
            <br />
            Maintenance Mode : {dataopen?.maintainance ? "On" : "Off"}
            <br />
            Latitude : {dataopen?.lat}
            <br />
            Longitude : {dataopen?.lng}
            <br />
            Last Updated :{" "}
            {dataopen ? new Date(dataopen.updatedAt).toLocaleString() : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/trainstatus", { state: dataopen })}>
            History
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Box
          sx={{
            width: "98%",
            borderRadius: 3,
            p: 2,
            border: "1px solid #3271b8",
            bgcolor: "#d1efffff",
          }}
        >
          {/* Top Row: Title + Counts */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT: Title */}
            <Typography
              sx={{
                color: "#3271b8",
                fontSize: { xs: 16, md: 27 },
                fontWeight: 600,
              }}
            >
              Coach Status
            </Typography>

            {/* RIGHT: COUNT BOXES */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* Box 1 – Fault */}
              <Box
                sx={{
                  width: { xs: 45, md: 100, lg: 100 },
                  p: 1,
                  borderRadius: 2,
                  textAlign: "center",
                  border: "1px solid #d21919",
                  bgcolor: "#ffffffff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14, lg: 14 },
                    color: "#d21919",
                    fontWeight: 600,
                  }}
                >
                  Fault
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 17, md: 20, lg: 24 },
                    fontWeight: 700,
                    color: "#d21919",
                  }}
                >
                  {faultCount}
                </Typography>
              </Box>

              {/* Box 2 – Need Inspection */}
              <Box
                sx={{
                  width: { xs: 75, md: 100, lg: 100 },
                  p: 1,
                  borderRadius: 2,
                  textAlign: "center",
                  border: "1px solid #E68500",
                  bgcolor: "#ffffffff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14, lg: 14 },
                    color: "#E68500",
                    fontWeight: 600,
                  }}
                >
                  Inspection
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 17, md: 20, lg: 24 },
                    fontWeight: 700,
                    color: "#E68500",
                  }}
                >
                  {inspectCount}
                </Typography>
              </Box>

              {/* Box 3 – Normal */}
              <Box
                sx={{
                  p: 1,
                  width: { xs: 55, md: 100, lg: 100 },
                  borderRadius: 2,
                  textAlign: "center",
                  border: "1px solid #00A693",
                  bgcolor: "#ffffffff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14, lg: 14 },
                    color: "#00A693",
                    fontWeight: 600,
                  }}
                >
                  Normal
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 17, md: 20, lg: 24 },
                    fontWeight: 700,
                    color: "#00A693",
                  }}
                >
                  {normalCount}
                </Typography>
              </Box>

              {/* Box 4 – Maintenance */}
              <Box
                sx={{
                  p: 1,
                  width: { xs: 85, md: 100, lg: 100 },
                  borderRadius: 2,
                  textAlign: "center",
                  border: "1px solid #555555",
                  bgcolor: "#ffffffff",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14, lg: 14 },
                    color: "#555555",
                    fontWeight: 600,
                  }}
                >
                  Maintenance
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 17, md: 20, lg: 24 },
                    fontWeight: 700,
                    color: "#555555",
                  }}
                >
                  {maintCount}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: 3,
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={5}
            sx={{
              width: { xs: "95%", md: "48%", lg: "48%" },
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={5}
              sx={{
                bgcolor: "#FFC0CB",

                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                border: "1px solid #CC3333",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: { xs: 17, md: 20, lg: 20 },
                  fontWeight: 600,
                  mb: -5,
                  width: "100%",
                }}
              >
                Fault Detected - Primary Battery &lt; 20v
              </Typography>

              {products
                .filter(
                  (product) =>
                    product.pribat < 20 && product.maintainance === false
                )
                .map((product, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                      bgcolor: "#45B1E8",
                      padding: 1,
                      borderRadius: 2,
                      border: "1px solid #1560BD",
                    }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 17, md: 20, lg: 20 },
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
                      Last Update :{" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Primary Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 14, md: 16, lg: 16 },
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
                bgcolor: "#F3E5AB",

                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                border: "1px solid #FFBA00",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: { xs: 17, md: 20, lg: 20 },
                  fontWeight: 600,

                  mb: -5,
                  width: "100%",
                }}
              >
                Needs Inspection - 20v &lt; Primary Battery &gt; 23v
              </Typography>
              {products
                .filter(
                  (product) =>
                    product.pribat >= 20 &&
                    product.pribat <= 23 &&
                    product.maintainance === false
                )
                .map((product, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                      bgcolor: "#45B1E8",
                      padding: 1,
                      borderRadius: 2,
                      border: "1px solid #1560BD",
                    }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 17, md: 20, lg: 20 },
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
                      Last Update :{" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Primary Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        color: "white",
                        fontSize: { xs: 14, md: 16, lg: 16 },
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
                bgcolor: "#ACE1AF",
                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                border: "1px solid #138808",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: { xs: 17, md: 20, lg: 20 },
                  fontWeight: 600,
                  mb: -5,
                  width: "100%",
                }}
              >
                Working Fine - Primary Battery &gt; 23v
              </Typography>

              {products
                .filter(
                  (product) =>
                    product.pribat > 23 && product.maintainance === false
                )
                .map((product, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                      bgcolor: "#FFFFFF",
                      py: 1,
                      px: 3,
                      borderRadius: 2,
                      border: "1px solid #138808",
                    }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#EC5800",
                        fontSize: { xs: 17, md: 20, lg: 20 },
                        fontWeight: 600,
                        textAlign: "center",
                        my: 0,
                        ml: 1,
                      }}
                    >
                      {product.coachid}{" "}
                      <RssFeedIcon
                        sx={{
                          color: "#EC5800",
                          fontSize: { xs: 17, md: 20, lg: 24 },
                        }}
                      />
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                        color: "#003262",
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                        mb: 1,
                        mx: 1,
                      }}
                    >
                      <UpdateIcon
                        sx={{
                          color: "#003262",
                          fontSize: { xs: 18, md: 20, lg: 17 },
                        }}
                      />{" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        color: "#008080",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      <BatteryCharging90Icon
                        sx={{
                          color: "#008080",
                          fontSize: { xs: 18, md: 20, lg: 20 },
                        }}
                      />
                      Primary Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        color: "#DC343B",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      <BatteryCharging90Icon
                        sx={{
                          color: "#DC343B",
                          fontSize: { xs: 18, md: 20, lg: 20 },
                        }}
                      />
                      Backup Battery: {product.backbat}v
                    </Typography>
                  </Grid>
                ))}
            </Grid>

            <Grid
              container
              spacing={5}
              sx={{
                bgcolor: "#E5E4E2",
                padding: 2,
                borderRadius: 3,
                minHeight: 140,
                border: "1px solid #555555",
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  color: "#36454F",
                  fontSize: { xs: 17, md: 20, lg: 20 },
                  fontWeight: 600,
                  mb: -5,
                  width: "100%",
                }}
              >
                Maintenance Mode
              </Typography>

              {products
                .filter((product) => product.maintainance === true)
                .map((product, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    sx={{
                      bgcolor: "#FFFFFF",
                      py: 1,
                      px: 3,
                      borderRadius: 2,
                      border: "1px solid #555555",
                    }}
                    onClick={() => showProductDialog(product)}
                  >
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#EC5800",
                        fontSize: { xs: 17, md: 20, lg: 20 },
                        fontWeight: 600,
                        textAlign: "center",
                        my: 0,
                        ml: 1,
                      }}
                    >
                      {product.coachid}{" "}
                      <RssFeedIcon
                        sx={{
                          color: "#EC5800",
                          fontSize: { xs: 17, md: 20, lg: 24 },
                        }}
                      />
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.3,
                        color: "#003262",
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "center",
                        mb: 1,
                        mx: 1,
                      }}
                    >
                      <UpdateIcon
                        sx={{
                          color: "#003262",
                          fontSize: { xs: 18, md: 20, lg: 17 },
                        }}
                      />{" "}
                      {new Date(product.updatedAt).toLocaleString()}
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        color: "#008080",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      <BatteryCharging90Icon
                        sx={{
                          color: "#008080",
                          fontSize: { xs: 18, md: 20, lg: 20 },
                        }}
                      />
                      Primary Battery: {product.pribat}v
                    </Typography>

                    <Typography
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        color: "#DC343B",
                        fontSize: { xs: 14, md: 16, lg: 16 },
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      <BatteryCharging90Icon
                        sx={{
                          color: "#DC343B",
                          fontSize: { xs: 18, md: 20, lg: 20 },
                        }}
                      />
                      Backup Battery: {product.backbat}v
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid item sx={{ width: { xs: "95%", md: "48%", lg: "48%" } }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                height: "100%", // Fills the height of the column
                display: "flex",
                flexDirection: "column",
                borderColor: "#0070FF",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  sx={{
                    color: "#0070FF",
                    fontSize: { xs: 18, md: 22 },
                    fontWeight: 600,
                  }}
                >
                  Coach Location
                </Typography>
              </Box>

              <Box
                sx={{
                  flexGrow: 1, // Takes remaining vertical space
                  minHeight: "500px", // Minimum height for map
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                <MapContainer
                  center={position}
                  zoom={7}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  />

                  {products.map((product, index) => (
                    <Marker
                      position={[
                        product.mlat ?? product.lat,
                        product.mlng ?? product.lng,
                      ]}
                      key={index}
                      eventHandlers={{
                        click: () => showProductDialog(product),
                      }}
                    >
                      <Popup onClick={() => showProductDialog(product)}>
                        {product.coachid}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Trainshow;
