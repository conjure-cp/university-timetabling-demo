import { ThemeProvider, Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
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
    },
});

const CustomButton = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
                className={props.styles}
                color="gray"
                variant="contained"
                onClick={props.onClick}
            >
                {props.label}
            </Button>
        </ThemeProvider>
    )
}

export default CustomButton