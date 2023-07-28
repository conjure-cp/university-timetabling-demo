import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    gray: {
      main: '#64748B',
      contrastText: '#fff',
    },
    white: {
      main: '#64748B',
      contrastText: '#fff',
    },
    allowed: {
      main: '#64748B',
      contrastText: '#fff',
    },
    preferred: {
      main: '#152D4F',
      contrastText: '#fff',
    },
  },
});
