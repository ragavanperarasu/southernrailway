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
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { time: "10:00", pribat: 10 },
  { time: "10:05", pribat: 20 },
  { time: "10:10", pribat: 15 },
  { time: "10:15", pribat: 30 },
];

const Trainstatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { coachid } = location.state || {};

  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pribatData, setPribatData] = useState([]);
  const [backbatData, setBackbatData] = useState([]);
  const [signalData, setSignalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [coachid]);

  const fetchData = async () => {
    console.log("Inside fetchData function");
    try {
      const response = await axios.get(
        `http://72.60.103.126/coach/${coachid}`
      );

      const raw = response.data;

      const priData = raw.map((item) => {
        const d = new Date(item.createdAt);
        const date = d.toISOString().split("T")[0];
        const time = d.toLocaleTimeString(); 
        return {
          time: `${date} ${time}`,
          volt: item.pribat,
        };
      });


      const backData = raw.map((item) => {
        const d = new Date(item.createdAt);
        const date = d.toISOString().split("T")[0];
        const time = d.toLocaleTimeString(); 

        return {
          time: `${date} ${time}`,
          volt: item.backbat,
        };
      });

      const signalData = raw.map((item) => {
        const d = new Date(item.createdAt);
        const date = d.toISOString().split("T")[0];
        const time = d.toLocaleTimeString(); 

        return {
          time: `${date} ${time}`,
          signal: item.sig,
        };
      });

      setPribatData(priData);
      setBackbatData(backData);
      setSignalData(signalData);
    } catch (error) {
      console.error("Error fetching train status data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#E5E4E2", minHeight: "100vh", height: "100%" }}>
        <Appbar />
        <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
          Fetching Data...
        </Typography>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <CircularProgress enableTrackSlot size="3rem" />
        </Stack>
      </Box>
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
        }}
      >
        Coach History - {coachid}
      </Typography>

      <Typography
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
        sx={{ width: "100%", height: { xs: 200, md: 300, lg: 400 }, bgcolor: "#ffffffff", paddingRight: 2, paddingLeft: -5, marginTop:2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pribatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18}/>
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
        sx={{ width: "100%", height: { xs: 200, md: 300, lg: 400 }, bgcolor: "#ffffffff", paddingRight: 2, paddingLeft: -5, marginTop:2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={backbatData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18}/>
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
        sx={{ width: "100%", height: { xs: 200, md: 300, lg: 400 }, bgcolor: "#ffffffff", paddingRight: 2, paddingLeft: -5, marginTop:2 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={signalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" fontSize={18}/>
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
      </Box>
    </>
  );
};

export default Trainstatus;
