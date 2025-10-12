import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: { main: "#0052cc" },      // Indian Railways blue
    secondary: { main: "#ff4500" },    // Accent orange
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Philosopher",
    h6: { fontWeight: 700, fontSize: "1.5rem",},
    h2: { fontWeight: 600, fontSize: "2rem" },
    body1: { fontSize: "1rem" },
    button: { fontFamily: "Roboto Slab", textTransform:'none', fontSize:18,}
  },
});

export default theme;
