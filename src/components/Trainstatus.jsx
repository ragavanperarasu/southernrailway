import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid, // Added Grid
  Paper, // Added Paper for better container styling
} from "@mui/material";
import Appbar from "./Appbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import LoadingScreen from "./LoadingScreen";

const position = [11.0168, 76.9558]; // Coimbatore

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [40, 65],
  iconAnchor: [20, 64],
  popupAnchor: [1, -50],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [65, 65],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Trainstatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { coachid } = location.state || {};

  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comData, setComData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [coachid]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `coach/${coachid}`
      );

      const raw = response.data;

      const combinedData = raw.map((item) => {
        const d = new Date(item.createdAt);
        const date = d.toISOString().split("T")[0];
        const time = d.toLocaleTimeString();
        const formattedTime = `${date} ${time}`;

        return {
          time: formattedTime,
          pribat: item.pribat,
          backbat: item.backbat,
          signal: item.sig,
        };
      });
      setComData(combinedData);
      setTrainData(raw);
    } catch (error) {
      console.error("Error fetching train status data:", error);
    } finally {
      setLoading(false);
    }
  };

    const fetchData2 = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}coachloc/${coachid}`);
  
        const raw = response.data;
  
        setTrainData(raw);
      } catch (error) {
        console.error("Error fetching train status data:", error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <>
        <Appbar />
        <LoadingScreen />
      </>
    );
  }

  return (
    <Box sx={{ bgcolor: "#ffffffff", minHeight: "100vh", pb: 4 }}>
      <Appbar />

      {/* Main Page Title */}
      <Typography
        sx={{
          color: "#00A693",
          fontSize: { xs: 20, md: 27, lg: 27 },
          fontWeight: 600,
          textAlign: "center",
          width: "100%",
          marginBottom: 2,
          marginTop: 12,
        }}
      >
        Coach History - {coachid}
      </Typography>

      {/* Grid Layout: Left (Charts) - Right (Map) */}
      <Box>
        <Grid container spacing={2} sx={{display:'flex', justifyContent:'center'}}>
          
          {/* LEFT COLUMN: GRAPHS */}
          <Grid item sx={{width:{ xs: '95%', md: '48%', lg: '48%' }}}>
            
            {/* Battery Chart */}
            <Paper sx={{ p: 2, borderRadius: 2, borderColor: "#000", borderWidth: 1, borderStyle: 'solid', mb: 2 }} >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: 18,
                  fontWeight: 600,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Battery Voltage History
              </Typography>
              <Box sx={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" align="center" />
                    <Line
                      type="monotone"
                      dataKey="pribat"
                      stroke="#F04A00"
                      strokeWidth={3}
                      name="Primary Battery"
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="backbat"
                      stroke="#0070FF"
                      strokeWidth={3}
                      name="Backup Battery"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* Signal Chart */}
            <Paper sx={{ p: 2, borderRadius: 2, borderColor: "#d219b9ff", borderWidth: 1, borderStyle: 'solid' }} >
              <Typography
                sx={{
                  color: "#d219b9ff",
                  fontSize: 18,
                  fontWeight: 600,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                GSM Signal History
              </Typography>
              <Box sx={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" fontSize={12} />
                    <YAxis dataKey="signal" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="signal"
                      stroke="#d219b9ff"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN: MAP */}
          <Grid item sx={{width:{ xs: '95%', md: '48%', lg: '48%' }}}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                height: "100%", // Fills the height of the column
                display: "flex",
                flexDirection: "column",
                 borderColor: "#0070FF", borderWidth: 1, borderStyle: 'solid'
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
                  Location History
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#0070FF",
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                  onClick={fetchData2}
                  
                >
                  Show Full History
                </Button>
              </Box>

              {/* Map Container */}
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
                  center={
                    trainData[0]
                      ? [trainData[0].lat, trainData[0].lng]
                      : position
                  }
                  zoom={7}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  />

                  {trainData.map((product, index) => (
                    <Marker
                      position={[product.lat, product.lng]}
                      icon={index === 0 ? redIcon : greenIcon}
                      key={index}
                    >
                      <Popup>
                        {new Date(product.createdAt).toLocaleString()}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Trainstatus;