import { Autocomplete, TextField, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import styles from "../../assets/components/AutoComplete/AutoComplete.module.css";


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
 * Autocomplete component based on Mui component
 * The component has TextField
 * 
 * Requires 3 params
 * @param {options: {object of array} | [array],
 *         label: "Label of the component",
 *         autocompleteHanlder: (onInputChange handler)} props 
 * @returns autocomplete component
 */
const AutoComplete = (props) => {
    return (
        < ThemeProvider theme={theme} >
            <Autocomplete
                required
                disableClearable

                id="standard-required"
                variant="standard"
                className={styles.input}
                options={props.options}
                renderInput={(params) => <TextField color="gray" variant='standard'{...params} label={props.label} />}
                onInputChange={(event, newInputValue) => {
                    props.autocompleteHanlder(newInputValue);
                }}
            />
        </ThemeProvider >
    )
}

export default AutoComplete; 