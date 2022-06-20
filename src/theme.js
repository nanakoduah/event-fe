import { createTheme } from '@mui/material/styles';
import { green, blue, red, grey, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    info: blue,
    success: green,
    grey,
    warn: amber,
    red,
  },
  typography: {
    fontSize: {
      sectionHeader: 22,
    },
  },
});

export default theme;
