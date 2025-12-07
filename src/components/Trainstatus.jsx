import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Box,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Stack,
} from "@mui/material";
import Appbar from "./Appbar";
import { useLocation, useNavigate } from "react-router-dom";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BoltIcon from "@mui/icons-material/Bolt";
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
  iconSize: [40, 65],     // increased size
  iconAnchor: [20, 64],   // adjust anchor for correct placement
  popupAnchor: [1, -50],  // adjust popup position
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [65, 65],   // increase shadow too
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

  const [pribatData, setPribatData] = useState([]);
  const [backbatData, setBackbatData] = useState([]);
  const [signalData, setSignalData] = useState([]);
  const [comData, setComData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [coachid]);

  const fetchData = async () => {
    console.log("Inside fetchData function");
    try {
      const response = await axios.get(`http://72.60.103.126/coach/${coachid}`);

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

      // const priData = raw.map((item) => {
      //   const d = new Date(item.createdAt);
      //   const date = d.toISOString().split("T")[0];
      //   const time = d.toLocaleTimeString();
      //   return {
      //     time: `${date} ${time}`,
      //     volt: item.pribat,
      //   };
      // });

      // const backData = raw.map((item) => {
      //   const d = new Date(item.createdAt);
      //   const date = d.toISOString().split("T")[0];
      //   const time = d.toLocaleTimeString();

      //   return {
      //     time: `${date} ${time}`,
      //     volt: item.backbat,
      //   };
      // });

      // const signalData = raw.map((item) => {
      //   const d = new Date(item.createdAt);
      //   const date = d.toISOString().split("T")[0];
      //   const time = d.toLocaleTimeString();

      //   return {
      //     time: `${date} ${time}`,
      //     signal: item.sig,
      //   };
      // });

      setTrainData(raw);
      // setPribatData(priData);
      // setBackbatData(backData);
      // setSignalData(signalData);
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
    <>
      <Appbar />

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

      <Box
        sx={{
          width: "100%",
          height: { xs: 350, md: 350, lg: 450 },
          bgcolor: "#ffffff",
          paddingRight: 2,
          marginTop: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="center" />

            <Line
              type="monotone"
              dataKey="pribat"
              stroke="#F04A00" // Primary battery
              strokeWidth={3}
              name="Primary Battery"
            />

            <Line
              type="monotone"
              dataKey="backbat"
              stroke="#0070FF" // Backup battery
              strokeWidth={3}
              name="Backup Battery"
            />

            <Line
              type="monotone"
              dataKey="signal"
              stroke="#d219b9ff" // GSM Signal
              strokeWidth={3}
              name="GSM Signal"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* <Typography
        sx={{
          color: "#F04A00",
          fontSize: { xs: 17, md: 25, lg: 25 },
          fontWeight: 600,
          textAlign: "center",
          width: "100%",
        }}
      >
        Primary Battery Voltage History
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: { xs: 200, md: 300, lg: 400 },
          bgcolor: "#ffffffff",
          paddingRight: 2,
          paddingLeft: -5,
          marginTop: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pribatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18} />
            <YAxis dataKey="volt" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volt"
              stroke="#F04A00"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        sx={{
          color: "#0070FF",
          fontSize: { xs: 17, md: 25, lg: 25 },
          marginTop: 3,
          fontWeight: 600,
          textAlign: "center",
          width: "100%",
        }}
      >
        Backup Battery Voltage History
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: { xs: 200, md: 300, lg: 400 },
          bgcolor: "#ffffffff",
          paddingRight: 2,
          paddingLeft: -5,
          marginTop: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={backbatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18} />
            <YAxis dataKey="volt" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volt"
              stroke="#0070FF"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        sx={{
          color: "#d219b9ff",
          fontSize: { xs: 17, md: 25, lg: 25 },
          fontWeight: 600,
          marginTop: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        GSM Signal History
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: { xs: 200, md: 300, lg: 400 },
          bgcolor: "#ffffffff",
          paddingRight: 2,
          paddingLeft: -5,
          marginTop: 2,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={signalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18} />
            <YAxis dataKey="signal" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="signal"
              stroke="#d219b9ff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box> */}

      <Typography
        sx={{
          color: "#d219b9ff",
          fontSize: { xs: 17, md: 25, lg: 25 },
          fontWeight: 600,
          marginTop: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        Location History
      </Typography>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "90vh",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <MapContainer
            center={
              trainData[0] ? [trainData[0].lat, trainData[0].lng] : position
            }
            zoom={12}
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
              >
                <Popup>{new Date(product.createdAt).toLocaleString()}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Box>
    </>
  );
};

export default Trainstatus;
