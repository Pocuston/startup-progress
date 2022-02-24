import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
      light: grey.A400,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey.A200,
    },
    warning: {
      main: red.A400,
    },
  },
});

export default theme;
