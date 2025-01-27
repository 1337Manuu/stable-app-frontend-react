import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6b8e23", // Olive green for buttons, headers, etc.
    },
    secondary: {
      main: "#8b4513", // Saddle brown for accents
    },
    background: {
      default: "#f5f5dc", // Beige background
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});
