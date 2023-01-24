import { TextField, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import styles from '../../assets/components/TextField/TextField.module.css'

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

/**
 * TextField component based on Mui TextField
 * 
 * Requires 3 params
 * @param {type: "of input",
 *         value: "initial value",
 *         changeHandler: (onChange Handler)} props 
 * @returns TextField component
 */
const CustomTextField = (props) => {
    return (<ThemeProvider theme={theme}>
        <TextField
            color="gray"
            required
            id="standard-required"
            label="Module ID"
            variant="standard"
            className={styles.input}
            margin="normal"
            type={props.type}
            value={props.value}
            onChange={(event) => props.onChangeHandler(event.target.value)}
        />
    </ThemeProvider>)
}

export default CustomTextField
